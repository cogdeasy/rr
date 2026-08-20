namespace RR.Group.Api.Models;

public class StrategicPillar
{
    public string Key { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<Initiative> Initiatives { get; set; } = new();
}

public class Initiative
{
    public string Id { get; set; } = string.Empty;
    public string PillarKey { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Division { get; set; } = string.Empty;
    public string Owner { get; set; } = string.Empty;
    public double ProgressPercent { get; set; }
    public string Status { get; set; } = string.Empty;
    public string TargetDate { get; set; } = string.Empty;
    public string ValueMetric { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<InitiativeUpdate> Updates { get; set; } = new();
}

public class InitiativeUpdate
{
    public string Timestamp { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public double ProgressPercent { get; set; }
    public string Status { get; set; } = string.Empty;
    public string Note { get; set; } = string.Empty;
}

public class PrincipalRisk
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Owner { get; set; } = string.Empty;
    public string Likelihood { get; set; } = string.Empty;
    public string Impact { get; set; } = string.Empty;
    public string Trend { get; set; } = string.Empty;
    public string Mitigation { get; set; } = string.Empty;
}
