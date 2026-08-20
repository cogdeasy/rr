namespace RR.Group.Api.Models;

public enum ShopVisitStatus
{
    Planned,
    InductionScheduled,
    Stripped,
    InRepair,
    Assembly,
    Test,
    Released
}

public enum WorkscopeLevel
{
    Refurbishment,
    Performance,
    Major,
    FullOverhaul
}

public class EngineProgramme
{
    public string Key { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Segment { get; set; } = string.Empty;
    public string Application { get; set; } = string.Empty;
    public int InServiceEngines { get; set; }
    public int OrderBook { get; set; }
    public double EngineFlyingHoursMillions { get; set; }
    public double TimeOnWingUpliftPercent { get; set; }
    public double TimeOnWingTargetPercent { get; set; }
    public int AircraftOnGround { get; set; }
    public string DurabilityStatus { get; set; } = string.Empty;
    public string Commentary { get; set; } = string.Empty;
}

public class TimeOnWingWorkstream
{
    public string Id { get; set; } = string.Empty;
    public string Programme { get; set; } = string.Empty;
    public string Modification { get; set; } = string.Empty;
    public string Phase { get; set; } = string.Empty;
    public double FleetPenetrationPercent { get; set; }
    public double DurabilityUpliftPercent { get; set; }
    public string TargetDate { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

public class MroSite
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Network { get; set; } = string.Empty;
    public List<string> Programmes { get; set; } = new();
    public int AnnualCapacity { get; set; }
    public int ShopVisitsYtd { get; set; }
    public double UtilisationPercent { get; set; }
    public double AverageTurnaroundDays { get; set; }
    public string Status { get; set; } = string.Empty;
}

public class ShopVisit
{
    public string Id { get; set; } = string.Empty;
    public string EngineSerialNumber { get; set; } = string.Empty;
    public string Programme { get; set; } = string.Empty;
    public string Operator { get; set; } = string.Empty;
    public string SiteId { get; set; } = string.Empty;
    public WorkscopeLevel Workscope { get; set; }
    public ShopVisitStatus Status { get; set; }
    public string InductionDate { get; set; } = string.Empty;
    public string PlannedReleaseDate { get; set; } = string.Empty;
    public int TurnaroundDays { get; set; }
    public double CostEstimateGbpK { get; set; }
    public bool IsAogRisk { get; set; }
    public bool HpTurbineBladeUpgrade { get; set; }
    public string Notes { get; set; } = string.Empty;
    public List<ShopVisitEvent> History { get; set; } = new();
}

public class ShopVisitEvent
{
    public string Timestamp { get; set; } = string.Empty;
    public string Actor { get; set; } = string.Empty;
    public string Action { get; set; } = string.Empty;
    public string Detail { get; set; } = string.Empty;
}

public class CivilAerospaceMetrics
{
    public int LargeEngineOeDeliveries { get; set; }
    public int BusinessAviationOeDeliveries { get; set; }
    public double LargeEngineFlyingHoursMillions { get; set; }
    public double BusinessAviationFlyingHoursMillions { get; set; }
    public int LargeEngineShopVisits { get; set; }
    public int BusinessAviationShopVisits { get; set; }
    public int MajorShopVisits { get; set; }
    public double LargeEfhPercentOf2019 { get; set; }
    public int LargeEngineOrderBook { get; set; }
    public double GrossContractualMarginImprovement { get; set; }
    public double NetContractualImprovement { get; set; }
    public double NetLtsaBalanceGrowth { get; set; }
    public int AircraftOnGround { get; set; }
    public double MroOutputGrowthPercent { get; set; }
    public double RefurbishmentGrowthPercent { get; set; }
}
