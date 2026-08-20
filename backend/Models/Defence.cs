namespace RR.Group.Api.Models;

public class DefenceProgramme
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Sector { get; set; } = string.Empty;
    public string Platform { get; set; } = string.Empty;
    public string Customer { get; set; } = string.Empty;
    public string Product { get; set; } = string.Empty;
    public double OrderValueGbpM { get; set; }
    public string Phase { get; set; } = string.Empty;
    public bool Autonomous { get; set; }
    public string LatestMilestone { get; set; } = string.Empty;
    public string MilestoneDate { get; set; } = string.Empty;
    public double ProgressPercent { get; set; }
}

public class DefenceMetrics
{
    public double OrderIntakeGbpBn { get; set; }
    public double BookToBill { get; set; }
    public double OrderBacklogGbpBn { get; set; }
    public double OrderCoverPercent { get; set; }
    public double RevenueGrowthPercent { get; set; }
    public double CombatGrowthPercent { get; set; }
    public double SubmarinesGrowthPercent { get; set; }
    public double TransportGrowthPercent { get; set; }
    public double GcapFundingGbpBn { get; set; }
    public double AutonomyFundingGbpBn { get; set; }
}
