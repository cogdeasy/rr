namespace RR.Group.Api.Models;

public class SmrTender
{
    public string Id { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string Customer { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public int Units { get; set; }
    public string AwardDate { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;
}

public class NuclearProgramme
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Technology { get; set; } = string.Empty;
    public string Partner { get; set; } = string.Empty;
    public string Stage { get; set; } = string.Empty;
    public double ProgressPercent { get; set; }
    public string Description { get; set; } = string.Empty;
}
