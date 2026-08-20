using RR.Group.Api.Models;

namespace RR.Group.Api.Data;

/// <summary>
/// Group financial position as reported in the Rolls-Royce Holdings plc 2026 Half Year Results (30 July 2026).
/// All monetary values are £ million unless stated otherwise.
/// </summary>
public static class GroupSeed
{
    public static GroupSummary Summary() => new()
    {
        Period = "H1 2026",
        ReportDate = "2026-07-30",
        Headline = "Strong operational and financial performance driven by transformation; FY26 guidance raised",
        CeoQuote = "Our transformation continues to deliver, and we are demonstrating that Rolls-Royce is now a very different company to that of the past. We have unlocked new growth opportunities across the Group and created a resilient and diversified portfolio, with three strong businesses that can respond to changes in the external environment with agility and pace.",
        HeadlineMetrics = new List<HeadlineMetric>
        {
            new() { Key = "revenue", Label = "Underlying revenue", Value = "£11,279m", PriorValue = "£9,057m", ChangePercent = 26, Commentary = "Organic growth across all three divisions." },
            new() { Key = "operating-profit", Label = "Underlying operating profit", Value = "£2,534m", PriorValue = "£1,733m", ChangePercent = 46, Commentary = "Higher LTSA margins, aftermarket performance and commercial optimisation." },
            new() { Key = "operating-margin", Label = "Underlying operating margin", Value = "22.5%", PriorValue = "19.1%", ChangePercent = 3.1, Commentary = "Margin expansion in every division." },
            new() { Key = "free-cash-flow", Label = "Free cash flow", Value = "£1,964m", PriorValue = "£1,582m", ChangePercent = 24, Commentary = "Higher operating profit, partly offset by lower LTSA balance growth and higher cash tax." },
            new() { Key = "return-on-capital", Label = "Return on capital", Value = "22.0%", PriorValue = "16.9%", ChangePercent = 5.1, Commentary = "Adjusted return on capital, excluding the £181m ACT re-recognition." },
            new() { Key = "eps", Label = "Underlying EPS", Value = "22.17p", PriorValue = "15.74p", ChangePercent = 41, Commentary = "Underlying basic earnings per share." },
            new() { Key = "net-cash", Label = "Net cash", Value = "£2,136m", PriorValue = "£1,895m", PriorLabel = "31 Dec 2025", ChangePercent = 12.7, Commentary = "Liquidity of £9.0bn at 30 June 2026." },
            new() { Key = "tcc-gm", Label = "TCC / gross margin", Value = "0.27x", PriorValue = "0.35x", ChangePercent = -22.9, Commentary = "Best-in-class total underlying cash costs as a proportion of gross margin." }
        },
        Guidance = new List<GuidanceItem>
        {
            new() { Metric = "Underlying operating profit", Upgraded = "£4.7bn-£4.9bn", Previous = "£4.0bn-£4.2bn", LowerBound = 4.7, UpperBound = 4.9, HalfYearActual = 2.534 },
            new() { Metric = "Free cash flow", Upgraded = "£3.8bn-£4.0bn", Previous = "£3.6bn-£3.8bn", LowerBound = 3.8, UpperBound = 4.0, HalfYearActual = 1.964 }
        },
        Divisions = new List<DivisionPerformance>
        {
            new()
            {
                Key = "civil-aerospace",
                Name = "Civil Aerospace",
                UnderlyingRevenue = 6186,
                RevenueOrganicChangePercent = 29,
                UnderlyingOperatingProfit = 1567,
                ProfitOrganicChangePercent = 31,
                OperatingMarginPercent = 25.3,
                MarginChangePoints = 0.5,
                TradingCashFlow = 1458,
                Summary = "Stronger large engine aftermarket performance with higher LTSA margins, time and materials performance and contractual margin improvements.",
                Priorities = new List<string>
                {
                    "Increase time on wing across in-production engines by more than 100% by end 2027",
                    "Sustain the effective elimination of aircraft on ground",
                    "Expand global MRO capacity and reduce shop visit turnaround times",
                    "Improve LTSA margins through commercial optimisation and onerous contract renegotiation"
                }
            },
            new()
            {
                Key = "defence",
                Name = "Defence",
                UnderlyingRevenue = 2484,
                RevenueOrganicChangePercent = 17,
                UnderlyingOperatingProfit = 522,
                ProfitOrganicChangePercent = 57,
                OperatingMarginPercent = 21.0,
                MarginChangePoints = 5.4,
                TradingCashFlow = 615,
                Summary = "Stronger aftermarket performance across transport and combat alongside continued self-help and profitable international sales.",
                Priorities = new List<string>
                {
                    "Establish global leadership in autonomous propulsion",
                    "Convert the UK Defence Investment Plan into long-term programme funding",
                    "Grow submarines capacity for AUKUS and Continuous at Sea Deterrent",
                    "Reduce shop visit costs and drive manufacturing efficiencies"
                }
            },
            new()
            {
                Key = "power-systems",
                Name = "Power Systems",
                UnderlyingRevenue = 2604,
                RevenueOrganicChangePercent = 28,
                UnderlyingOperatingProfit = 528,
                ProfitOrganicChangePercent = 72,
                OperatingMarginPercent = 20.3,
                MarginChangePoints = 5.3,
                TradingCashFlow = 507,
                Summary = "Strong power generation performance led by data centres, with volume growth, improved mix and commercial optimisation.",
                Priorities = new List<string>
                {
                    "Capture 25% power generation OE revenue growth to 2030, led by data centres",
                    "Grow governmental OE revenue by 20% to 2030 with the mtu Series 199 platform",
                    "Launch the next generation engine with 20% higher power density in 2028",
                    "Scale battery energy storage delivery across Europe"
                }
            },
            new()
            {
                Key = "other-businesses",
                Name = "All Other Businesses",
                UnderlyingRevenue = 5,
                RevenueOrganicChangePercent = -17,
                UnderlyingOperatingProfit = -30,
                ProfitOrganicChangePercent = -41,
                OperatingMarginPercent = 0,
                MarginChangePoints = 0,
                TradingCashFlow = -12,
                Summary = "UK Civil Nuclear and the Group's share of Rolls-Royce SMR Limited.",
                Priorities = new List<string>
                {
                    "Convert the European SMR tender pipeline into executed contracts",
                    "Accelerate Advanced Modular Reactor research with UK and Japanese nuclear authorities"
                }
            }
        },
        TradingCashFlow = new List<CashFlowLine>
        {
            new() { Label = "Civil Aerospace", CurrentPeriod = 1458, PriorPeriod = 1111 },
            new() { Label = "Defence", CurrentPeriod = 615, PriorPeriod = 327 },
            new() { Label = "Power Systems", CurrentPeriod = 507, PriorPeriod = 425 },
            new() { Label = "All Other Businesses", CurrentPeriod = -12, PriorPeriod = 17 },
            new() { Label = "Corporate/eliminations", CurrentPeriod = -50, PriorPeriod = -33 },
            new() { Label = "Total trading cash flow", CurrentPeriod = 2518, PriorPeriod = 1847, IsTotal = true },
            new() { Label = "Pension contributions above charge", CurrentPeriod = -29, PriorPeriod = -6 },
            new() { Label = "Taxation", CurrentPeriod = -525, PriorPeriod = -259 },
            new() { Label = "Total free cash flow", CurrentPeriod = 1964, PriorPeriod = 1582, IsTotal = true }
        },
        Capital = new CapitalPosition
        {
            NetCash = 2136,
            GrossDebt = 2700,
            Liquidity = 9000,
            LeaseLiabilities = 1700,
            TccGmRatio = 0.27,
            InterimDividendPence = 6.0,
            BuybackCompleted = 1400,
            BuybackTranche = 2500,
            BuybackProgramme = "£7bn-£9bn multi-year programme across 2026 to 2028",
            CreditRatings = new List<CreditRating>
            {
                new() { Agency = "Moody's", Rating = "A3", Outlook = "Stable", Action = "Upgraded" },
                new() { Agency = "Fitch", Rating = "A-", Outlook = "Stable", Action = "Upgraded" },
                new() { Agency = "S&P Global", Rating = "BBB+", Outlook = "Positive", Action = "Affirmed, outlook raised" }
            }
        }
    };
}
