using RR.Group.Api.DTOs;
using RR.Group.Api.Models;

namespace RR.Group.Api.Services;

/// <summary>
/// AiRR (AI at Rolls-Royce) analytics: work scope prediction, engine prognostics and
/// guidance scenario modelling. The models are deterministic and illustrative — they encode the
/// published H1 2026 operating baseline rather than production engineering data.
/// </summary>
public class AnalyticsService
{
    private const double CivilFyRevenueBaseline = 12.4;
    private const double DefenceFyRevenueBaseline = 5.0;
    private const double PowerFyRevenueBaseline = 5.3;
    private const double CivilSecondHalfCatchUpDrag = 0.35;
    private const double CorporateAndOtherProfit = -0.166;
    private const double CashConversion = 0.93;
    private const double OtherCashOutflow = 0.31;

    private static readonly Dictionary<string, int> DesignLifeCycles = new(StringComparer.OrdinalIgnoreCase)
    {
        ["Trent 1000"] = 4_200,
        ["Trent 7000"] = 4_600,
        ["Trent XWB-84"] = 6_800,
        ["Trent XWB-97"] = 5_400,
        ["Trent 900"] = 5_000,
        ["Pearl 700"] = 5_600,
        ["Pearl 10X"] = 6_000
    };

    private static readonly Dictionary<string, double> EnvironmentSeverity = new(StringComparer.OrdinalIgnoreCase)
    {
        ["Temperate"] = 1.0,
        ["Tropical"] = 1.15,
        ["Desert"] = 1.35,
        ["Coastal"] = 1.1,
        ["High cycle short haul"] = 1.25
    };

    public WorkscopePrediction PredictWorkscope(WorkscopePredictionRequest request)
    {
        var designLife = DesignLife(request.Programme);
        var severity = Severity(request.OperatingEnvironment);
        var upgradeFactor = request.HpTurbineBladeUpgraded ? 0.55 : 1.0;

        var effectiveCycles = request.CyclesSinceNew * severity * upgradeFactor;
        var lifeConsumed = Math.Clamp(effectiveCycles / designLife, 0, 1.5);
        var egtPenalty = Math.Clamp((30 - request.ExhaustGasTemperatureMargin) / 60.0, -0.2, 0.5);
        var severityIndex = Math.Clamp(lifeConsumed + egtPenalty + request.HoursSinceLastShopVisit / 60_000.0, 0, 2);

        var workscope = severityIndex switch
        {
            < 0.45 => WorkscopeLevel.Refurbishment,
            < 0.75 => WorkscopeLevel.Performance,
            < 1.05 => WorkscopeLevel.Major,
            _ => WorkscopeLevel.FullOverhaul
        };

        var drivers = new List<string>
        {
            $"Life consumed {lifeConsumed:P0} of the {designLife:N0} cycle design life for the {request.Programme}.",
            $"{request.OperatingEnvironment} operating environment applies a {severity:0.00}x severity factor.",
            $"EGT margin of {request.ExhaustGasTemperatureMargin:0}°C contributes {egtPenalty:+0.00;-0.00} to the severity index."
        };

        if (request.HpTurbineBladeUpgraded)
        {
            drivers.Add("Upgraded HPT blades (XE standard) reduce effective deterioration by 45%.");
        }

        var actions = new List<string>();
        if (!request.HpTurbineBladeUpgraded && DesignLifeCycles.ContainsKey(request.Programme))
        {
            actions.Add("Embody the upgraded HPT blade set at this shop visit to bring the engine to XE standard.");
        }

        if (workscope >= WorkscopeLevel.Major)
        {
            actions.Add("Pre-position long lead life limited parts to protect turnaround time.");
        }

        actions.Add("Schedule into a site with spare capacity to protect the zero aircraft on ground position.");

        return new WorkscopePrediction
        {
            RecommendedWorkscope = workscope,
            ConfidencePercent = Math.Round(Math.Clamp(94 - Math.Abs(severityIndex - 0.75) * 22, 62, 96), 1),
            PredictedTurnaroundDays = workscope switch
            {
                WorkscopeLevel.Refurbishment => 45,
                WorkscopeLevel.Performance => 62,
                WorkscopeLevel.Major => 74,
                _ => 84
            },
            PredictedCostGbpK = Math.Round(workscope switch
            {
                WorkscopeLevel.Refurbishment => 2_100,
                WorkscopeLevel.Performance => 3_500,
                WorkscopeLevel.Major => 4_900,
                _ => 5_700
            } * (1 + egtPenalty * 0.2), 0),
            PredictedTimeOnWingCycles = (int)Math.Round(designLife * (request.HpTurbineBladeUpgraded ? 1.8 : 1.0) / severity),
            Drivers = drivers,
            RecommendedActions = actions
        };
    }

    public PrognosticsResult RunPrognostics(PrognosticsRequest request)
    {
        var designLife = DesignLife(request.Programme);
        var severity = Severity(request.OperatingEnvironment);
        var durabilityFactor = request.HpTurbineBladeUpgraded ? 1.8 : 1.0;
        var usableCycles = designLife * durabilityFactor / severity;
        var remaining = Math.Max(0, usableCycles - request.CyclesSinceNew);
        var cyclesPerMonth = Math.Max(1, request.AverageCyclesPerMonth);
        var months = remaining / cyclesPerMonth;

        var curve = new List<DegradationPoint>();
        for (var step = 0; step <= 10; step++)
        {
            var cycles = (int)Math.Round(usableCycles * step / 10.0);
            var health = 100 * Math.Exp(-2.2 * Math.Pow(cycles / usableCycles, 1.6));
            curve.Add(new DegradationPoint { Cycles = cycles, HealthIndex = Math.Round(health, 1) });
        }

        return new PrognosticsResult
        {
            Programme = request.Programme,
            RemainingUsefulLifeCycles = (int)Math.Round(remaining),
            RemainingUsefulLifeMonths = Math.Round(months, 1),
            RecommendedRemovalWindow = months <= 0
                ? "Immediate — engine is beyond its predicted on-wing life"
                : $"{DateTime.UtcNow.AddMonths((int)Math.Max(0, months - 2)):MMM yyyy} to {DateTime.UtcNow.AddMonths((int)months):MMM yyyy}",
            ConfidencePercent = Math.Round(Math.Clamp(92 - severity * 8, 60, 95), 1),
            DegradationCurve = curve,
            Assumptions = new List<string>
            {
                $"Design life baseline of {designLife:N0} cycles for the {request.Programme}.",
                $"{request.OperatingEnvironment} severity factor {severity:0.00}x.",
                request.HpTurbineBladeUpgraded
                    ? "Upgraded HPT blades applied: 1.8x durability uplift consistent with the time on wing programme."
                    : "Baseline HPT blade standard: no durability uplift applied.",
                $"Utilisation of {cyclesPerMonth:0} cycles per month."
            }
        };
    }

    public ScenarioResult RunScenario(ScenarioRequest request)
    {
        var volumeFactor =
            0.45 * (request.LargeEfhPercentOf2019 / 113.0) +
            0.35 * (request.TotalShopVisits / 1_500.0) +
            0.20 * (request.OeDeliveries / 575.0);

        var civilRevenue = CivilFyRevenueBaseline * volumeFactor;
        var civilMargin = 25.3 + request.CivilMarginDeltaPoints;
        var civilProfit = civilRevenue * civilMargin / 100 - CivilSecondHalfCatchUpDrag;

        var defenceRevenue = DefenceFyRevenueBaseline;
        var defenceMargin = 21.0 + request.DefenceMarginDeltaPoints;
        var defenceProfit = defenceRevenue * defenceMargin / 100;

        var powerRevenue = PowerFyRevenueBaseline;
        var powerMargin = 20.3 + request.PowerSystemsMarginDeltaPoints;
        var powerProfit = powerRevenue * powerMargin / 100;

        var totalRevenue = civilRevenue + defenceRevenue + powerRevenue;
        var totalProfit = civilProfit + defenceProfit + powerProfit + CorporateAndOtherProfit;
        var freeCashFlow = totalProfit * CashConversion - request.SupplyChainCashImpactGbpM / 1_000.0 - OtherCashOutflow;

        return new ScenarioResult
        {
            UnderlyingOperatingProfitGbpBn = Math.Round(totalProfit, 2),
            FreeCashFlowGbpBn = Math.Round(freeCashFlow, 2),
            OperatingMarginPercent = Math.Round(totalProfit / totalRevenue * 100, 1),
            ProfitGuidanceStatus = GuidanceStatus(totalProfit, 4.7, 4.9),
            CashFlowGuidanceStatus = GuidanceStatus(freeCashFlow, 3.8, 4.0),
            Contributions = new List<ScenarioContribution>
            {
                new() { Division = "Civil Aerospace", RevenueGbpBn = Math.Round(civilRevenue, 2), OperatingProfitGbpBn = Math.Round(civilProfit, 2), MarginPercent = Math.Round(civilProfit / civilRevenue * 100, 1) },
                new() { Division = "Defence", RevenueGbpBn = Math.Round(defenceRevenue, 2), OperatingProfitGbpBn = Math.Round(defenceProfit, 2), MarginPercent = Math.Round(defenceMargin, 1) },
                new() { Division = "Power Systems", RevenueGbpBn = Math.Round(powerRevenue, 2), OperatingProfitGbpBn = Math.Round(powerProfit, 2), MarginPercent = Math.Round(powerMargin, 1) }
            },
            Commentary = new List<string>
            {
                $"Volume factor of {volumeFactor:0.00}x applied to the Civil Aerospace full year revenue baseline of £{CivilFyRevenueBaseline:0.0}bn.",
                $"A £{CivilSecondHalfCatchUpDrag:0.00}bn second half drag reflects a lower contribution from contractual margin improvements than the £497m delivered in H1 2026.",
                $"Free cash flow assumes {CashConversion * 100:0}% conversion of underlying operating profit and a £{request.SupplyChainCashImpactGbpM:0}m aerospace supply chain cash impact."
            }
        };
    }

    private static string GuidanceStatus(double value, double lower, double upper) =>
        value < lower ? "Below guidance" : value > upper ? "Above guidance" : "Within guidance";

    private static int DesignLife(string programme) =>
        DesignLifeCycles.TryGetValue(programme, out var life) ? life : 5_000;

    private static double Severity(string environment) =>
        EnvironmentSeverity.TryGetValue(environment, out var factor) ? factor : 1.0;
}
