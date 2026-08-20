namespace RR.Group.Api.Models;

public class GroupSummary
{
    public string Period { get; set; } = string.Empty;
    public string ReportDate { get; set; } = string.Empty;
    public string Headline { get; set; } = string.Empty;
    public string CeoQuote { get; set; } = string.Empty;
    public List<HeadlineMetric> HeadlineMetrics { get; set; } = new();
    public List<GuidanceItem> Guidance { get; set; } = new();
    public List<DivisionPerformance> Divisions { get; set; } = new();
    public List<CashFlowLine> TradingCashFlow { get; set; } = new();
    public CapitalPosition Capital { get; set; } = new();
}

public class HeadlineMetric
{
    public string Key { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public string PriorValue { get; set; } = string.Empty;
    public string PriorLabel { get; set; } = "H1 2025";
    public double ChangePercent { get; set; }
    public string Commentary { get; set; } = string.Empty;
}

public class GuidanceItem
{
    public string Metric { get; set; } = string.Empty;
    public string Upgraded { get; set; } = string.Empty;
    public string Previous { get; set; } = string.Empty;
    public double LowerBound { get; set; }
    public double UpperBound { get; set; }
    public double HalfYearActual { get; set; }
    public string Unit { get; set; } = "£bn";
}

public class DivisionPerformance
{
    public string Key { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public double UnderlyingRevenue { get; set; }
    public double RevenueOrganicChangePercent { get; set; }
    public double UnderlyingOperatingProfit { get; set; }
    public double ProfitOrganicChangePercent { get; set; }
    public double OperatingMarginPercent { get; set; }
    public double MarginChangePoints { get; set; }
    public double TradingCashFlow { get; set; }
    public string Summary { get; set; } = string.Empty;
    public List<string> Priorities { get; set; } = new();
}

public class CashFlowLine
{
    public string Label { get; set; } = string.Empty;
    public double CurrentPeriod { get; set; }
    public double PriorPeriod { get; set; }
    public bool IsTotal { get; set; }
}

public class CapitalPosition
{
    public double NetCash { get; set; }
    public double GrossDebt { get; set; }
    public double Liquidity { get; set; }
    public double LeaseLiabilities { get; set; }
    public double TccGmRatio { get; set; }
    public double InterimDividendPence { get; set; }
    public double BuybackCompleted { get; set; }
    public double BuybackTranche { get; set; }
    public string BuybackProgramme { get; set; } = string.Empty;
    public List<CreditRating> CreditRatings { get; set; } = new();
}

public class CreditRating
{
    public string Agency { get; set; } = string.Empty;
    public string Rating { get; set; } = string.Empty;
    public string Outlook { get; set; } = string.Empty;
    public string Action { get; set; } = string.Empty;
}
