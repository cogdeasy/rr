namespace RR.Group.Api.Models;

public enum OrderStage
{
    Qualified,
    Proposal,
    Negotiation,
    Won,
    Delivered
}

public class PowerOrder
{
    public string Id { get; set; } = string.Empty;
    public string Customer { get; set; } = string.Empty;
    public string Segment { get; set; } = string.Empty;
    public string Application { get; set; } = string.Empty;
    public string Product { get; set; } = string.Empty;
    public string Region { get; set; } = string.Empty;
    public double ValueGbpM { get; set; }
    public int Units { get; set; }
    public OrderStage Stage { get; set; }
    public string ExpectedDelivery { get; set; } = string.Empty;
    public bool FrameworkAgreement { get; set; }
    public string Notes { get; set; } = string.Empty;
}

public class BessProject
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Customer { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public double CapacityMwh { get; set; }
    public string Status { get; set; } = string.Empty;
    public string GridConnection { get; set; } = string.Empty;
}

public class PowerSystemsMetrics
{
    public double OrderIntakeGbpBn { get; set; }
    public double BookToBill { get; set; }
    public double PowerGenerationOrderGrowthPercent { get; set; }
    public double GovernmentalOrderGrowthPercent { get; set; }
    public double PowerGenerationRevenueGrowthPercent { get; set; }
    public double GovernmentalRevenueGrowthPercent { get; set; }
    public double PowerGenerationOeGrowthTo2030Percent { get; set; }
    public double GovernmentalOeGrowthTo2030Percent { get; set; }
    public double OrderCover2026Percent { get; set; }
    public double OrderCover2027Percent { get; set; }
}
