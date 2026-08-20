using System.ComponentModel.DataAnnotations;
using RR.Group.Api.Models;

namespace RR.Group.Api.DTOs;

public class CreateShopVisitRequest
{
    [Required] public string EngineSerialNumber { get; set; } = string.Empty;
    [Required] public string Programme { get; set; } = string.Empty;
    [Required] public string Operator { get; set; } = string.Empty;
    [Required] public string SiteId { get; set; } = string.Empty;
    public WorkscopeLevel Workscope { get; set; } = WorkscopeLevel.Refurbishment;
    [Required] public string InductionDate { get; set; } = string.Empty;
    public bool IsAogRisk { get; set; }
    public bool HpTurbineBladeUpgrade { get; set; }
    public string Notes { get; set; } = string.Empty;
}

public class UpdateShopVisitStatusRequest
{
    public ShopVisitStatus Status { get; set; }
    public string Actor { get; set; } = "MRO Planner";
    public string Note { get; set; } = string.Empty;
}

public class UpdateInitiativeRequest
{
    [Range(0, 100)] public double ProgressPercent { get; set; }
    [Required] public string Status { get; set; } = string.Empty;
    public string Author { get; set; } = "Transformation Office";
    public string Note { get; set; } = string.Empty;
}

public class CreatePowerOrderRequest
{
    [Required] public string Customer { get; set; } = string.Empty;
    [Required] public string Segment { get; set; } = string.Empty;
    [Required] public string Application { get; set; } = string.Empty;
    [Required] public string Product { get; set; } = string.Empty;
    public string Region { get; set; } = "Europe";
    [Range(0, 100000)] public double ValueGbpM { get; set; }
    public int Units { get; set; }
    public OrderStage Stage { get; set; } = OrderStage.Qualified;
    public string ExpectedDelivery { get; set; } = string.Empty;
    public bool FrameworkAgreement { get; set; }
    public string Notes { get; set; } = string.Empty;
}

public class WorkscopePredictionRequest
{
    [Required] public string Programme { get; set; } = string.Empty;
    [Range(0, 40000)] public int CyclesSinceNew { get; set; }
    [Range(0, 60000)] public int HoursSinceLastShopVisit { get; set; }
    public string OperatingEnvironment { get; set; } = "Temperate";
    public bool HpTurbineBladeUpgraded { get; set; }
    public double ExhaustGasTemperatureMargin { get; set; } = 25;
}

public class WorkscopePrediction
{
    public WorkscopeLevel RecommendedWorkscope { get; set; }
    public double ConfidencePercent { get; set; }
    public int PredictedTurnaroundDays { get; set; }
    public double PredictedCostGbpK { get; set; }
    public int PredictedTimeOnWingCycles { get; set; }
    public List<string> Drivers { get; set; } = new();
    public List<string> RecommendedActions { get; set; } = new();
}

public class PrognosticsRequest
{
    [Required] public string Programme { get; set; } = string.Empty;
    [Range(0, 40000)] public int CyclesSinceNew { get; set; }
    public string OperatingEnvironment { get; set; } = "Temperate";
    public bool HpTurbineBladeUpgraded { get; set; }
    [Range(1, 1000)] public double AverageCyclesPerMonth { get; set; } = 120;
}

public class PrognosticsResult
{
    public string Programme { get; set; } = string.Empty;
    public int RemainingUsefulLifeCycles { get; set; }
    public double RemainingUsefulLifeMonths { get; set; }
    public string RecommendedRemovalWindow { get; set; } = string.Empty;
    public double ConfidencePercent { get; set; }
    public List<DegradationPoint> DegradationCurve { get; set; } = new();
    public List<string> Assumptions { get; set; } = new();
}

public class DegradationPoint
{
    public int Cycles { get; set; }
    public double HealthIndex { get; set; }
}

public class ScenarioRequest
{
    [Range(90, 140)] public double LargeEfhPercentOf2019 { get; set; } = 113;
    [Range(1000, 2000)] public int TotalShopVisits { get; set; } = 1500;
    [Range(400, 700)] public int OeDeliveries { get; set; } = 575;
    [Range(-5, 5)] public double CivilMarginDeltaPoints { get; set; }
    [Range(-5, 5)] public double DefenceMarginDeltaPoints { get; set; }
    [Range(-5, 5)] public double PowerSystemsMarginDeltaPoints { get; set; }
    [Range(0, 400)] public double SupplyChainCashImpactGbpM { get; set; } = 175;
}

public class ScenarioResult
{
    public double UnderlyingOperatingProfitGbpBn { get; set; }
    public double FreeCashFlowGbpBn { get; set; }
    public double OperatingMarginPercent { get; set; }
    public string ProfitGuidanceStatus { get; set; } = string.Empty;
    public string CashFlowGuidanceStatus { get; set; } = string.Empty;
    public List<ScenarioContribution> Contributions { get; set; } = new();
    public List<string> Commentary { get; set; } = new();
}

public class ScenarioContribution
{
    public string Division { get; set; } = string.Empty;
    public double RevenueGbpBn { get; set; }
    public double OperatingProfitGbpBn { get; set; }
    public double MarginPercent { get; set; }
}
