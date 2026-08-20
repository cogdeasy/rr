using RR.Group.Api.Models;

namespace RR.Group.Api.Data;

public static class CivilSeed
{
    public static CivilAerospaceMetrics Metrics() => new()
    {
        LargeEngineOeDeliveries = 157,
        BusinessAviationOeDeliveries = 122,
        LargeEngineFlyingHoursMillions = 8.4,
        BusinessAviationFlyingHoursMillions = 1.6,
        LargeEngineShopVisits = 556,
        BusinessAviationShopVisits = 156,
        MajorShopVisits = 434,
        LargeEfhPercentOf2019 = 113,
        LargeEngineOrderBook = 2266,
        GrossContractualMarginImprovement = 574,
        NetContractualImprovement = 497,
        NetLtsaBalanceGrowth = 86,
        AircraftOnGround = 0,
        MroOutputGrowthPercent = 13,
        RefurbishmentGrowthPercent = 35
    };

    public static List<EngineProgramme> Programmes() => new()
    {
        new()
        {
            Key = "trent-1000",
            Name = "Trent 1000",
            Segment = "Large engine",
            Application = "Boeing 787",
            InServiceEngines = 1_460,
            OrderBook = 210,
            EngineFlyingHoursMillions = 2.1,
            TimeOnWingUpliftPercent = 130,
            TimeOnWingTargetPercent = 200,
            AircraftOnGround = 0,
            DurabilityStatus = "Phase 1 delivered, Phase 2 in rollout",
            Commentary = "Upgraded HPT blades now being installed at shop visit and on new engines. Almost 50% of the Trent 1000 TEN fleet is at XE standard."
        },
        new()
        {
            Key = "trent-7000",
            Name = "Trent 7000",
            Segment = "Large engine",
            Application = "Airbus A330neo",
            InServiceEngines = 520,
            OrderBook = 186,
            EngineFlyingHoursMillions = 1.3,
            TimeOnWingUpliftPercent = 130,
            TimeOnWingTargetPercent = 130,
            AircraftOnGround = 0,
            DurabilityStatus = "Fleet retrofit substantially complete",
            Commentary = "Benefits from the same HPT blade improvements as the Trent 1000; almost the entire fleet upgraded and performing well in service."
        },
        new()
        {
            Key = "trent-xwb-84",
            Name = "Trent XWB-84",
            Segment = "Large engine",
            Application = "Airbus A350-900",
            InServiceEngines = 1_240,
            OrderBook = 640,
            EngineFlyingHoursMillions = 3.0,
            TimeOnWingUpliftPercent = 70,
            TimeOnWingTargetPercent = 100,
            AircraftOnGround = 0,
            DurabilityStatus = "LLP life extensions on track to certify by year end",
            Commentary = "Improvement programme split to accelerate delivery. The XWB-84 EP variant is delivering a 1.8% specific fuel consumption improvement against a 1% target."
        },
        new()
        {
            Key = "trent-xwb-97",
            Name = "Trent XWB-97",
            Segment = "Large engine",
            Application = "Airbus A350-1000 / A350F",
            InServiceEngines = 330,
            OrderBook = 730,
            EngineFlyingHoursMillions = 1.1,
            TimeOnWingUpliftPercent = 55,
            TimeOnWingTargetPercent = 100,
            AircraftOnGround = 0,
            DurabilityStatus = "TRL 6 achieved on combustor and CMC seal segment",
            Commentary = "Powers the Qantas Project Sunrise A350-1000ULR programme. Sand-ingestion testing completed for the harshest operating environments."
        },
        new()
        {
            Key = "trent-900",
            Name = "Trent 900",
            Segment = "Large engine",
            Application = "Airbus A380",
            InServiceEngines = 480,
            OrderBook = 0,
            EngineFlyingHoursMillions = 0.6,
            TimeOnWingUpliftPercent = 40,
            TimeOnWingTargetPercent = 40,
            AircraftOnGround = 0,
            DurabilityStatus = "Mature fleet, sustainment only",
            Commentary = "Aftermarket support focused on turnaround time and cost per shop visit."
        },
        new()
        {
            Key = "pearl-10x",
            Name = "Pearl 10X",
            Segment = "Business aviation",
            Application = "Dassault Falcon 10X",
            InServiceEngines = 0,
            OrderBook = 145,
            EngineFlyingHoursMillions = 0.0,
            TimeOnWingUpliftPercent = 0,
            TimeOnWingTargetPercent = 100,
            AircraftOnGround = 0,
            DurabilityStatus = "Flight test, pre entry into service",
            Commentary = "Powered the first flight of the Falcon 10X; testing continues to support final aircraft certification."
        },
        new()
        {
            Key = "pearl-700",
            Name = "Pearl 700",
            Segment = "Business aviation",
            Application = "Gulfstream G700 / G800",
            InServiceEngines = 410,
            OrderBook = 320,
            EngineFlyingHoursMillions = 0.5,
            TimeOnWingUpliftPercent = 60,
            TimeOnWingTargetPercent = 100,
            AircraftOnGround = 0,
            DurabilityStatus = "In service, 100% SAF demonstrated",
            Commentary = "Powered the Gulfstream G800 first flight on 100% sustainable aviation fuel with a significant reduction in contrail-forming particulates."
        }
    };

    public static List<TimeOnWingWorkstream> TimeOnWing() => new()
    {
        new()
        {
            Id = "TOW-001",
            Programme = "Trent 1000",
            Modification = "Upgraded HPT blade (XE standard)",
            Phase = "Phase 1",
            FleetPenetrationPercent = 48,
            DurabilityUpliftPercent = 100,
            TargetDate = "2027-12-31",
            Status = "On track",
            Description = "Phase 1 HPT blade delivers a 100% increase in time on wing; installed at shop visit and on new build engines."
        },
        new()
        {
            Id = "TOW-002",
            Programme = "Trent 1000",
            Modification = "Phase 2 HPT modification",
            Phase = "Phase 2",
            FleetPenetrationPercent = 12,
            DurabilityUpliftPercent = 30,
            TargetDate = "2027-12-31",
            Status = "On track",
            Description = "Adds a further 30% improvement; combined with Phase 1 can deliver up to triple the time on wing depending on operations."
        },
        new()
        {
            Id = "TOW-003",
            Programme = "Trent 7000",
            Modification = "Common HPT blade upgrade",
            Phase = "Fleet retrofit",
            FleetPenetrationPercent = 96,
            DurabilityUpliftPercent = 100,
            TargetDate = "2026-12-31",
            Status = "Substantially complete",
            Description = "Almost the entire fleet has been upgraded and the improvements are performing well in service."
        },
        new()
        {
            Id = "TOW-004",
            Programme = "Trent XWB-84",
            Modification = "Life limited part life extensions",
            Phase = "Certification",
            FleetPenetrationPercent = 65,
            DurabilityUpliftPercent = 70,
            TargetDate = "2026-12-31",
            Status = "On track",
            Description = "Life extensions of critical LLPs pulled forward; remaining certifications due by year end."
        },
        new()
        {
            Id = "TOW-005",
            Programme = "Trent XWB-97",
            Modification = "CMC seal segment and combustor",
            Phase = "TRL 6",
            FleetPenetrationPercent = 0,
            DurabilityUpliftPercent = 55,
            TargetDate = "2027-06-30",
            Status = "Technology proven",
            Description = "Key technologies proven at TRL 6 including sand-ingestion testing for the harshest operating environments."
        }
    };

    public static List<MroSite> Sites() => new()
    {
        new() { Id = "MRO-DER", Name = "Rolls-Royce Derby", Location = "Derby, United Kingdom", Network = "Owned", Programmes = new() { "Trent 1000", "Trent XWB-84", "Trent XWB-97" }, AnnualCapacity = 260, ShopVisitsYtd = 141, UtilisationPercent = 92, AverageTurnaroundDays = 62, Status = "Operational" },
        new() { Id = "MRO-DAH", Name = "Rolls-Royce Dahlewitz", Location = "Dahlewitz, Germany", Network = "Owned", Programmes = new() { "Pearl 700", "Pearl 10X", "BR725" }, AnnualCapacity = 180, ShopVisitsYtd = 96, UtilisationPercent = 88, AverageTurnaroundDays = 45, Status = "Operational" },
        new() { Id = "MRO-SIN", Name = "Rolls-Royce Seletar", Location = "Singapore", Network = "Owned", Programmes = new() { "Trent 900", "Trent XWB-84" }, AnnualCapacity = 150, ShopVisitsYtd = 79, UtilisationPercent = 86, AverageTurnaroundDays = 58, Status = "Operational" },
        new() { Id = "MRO-LHT", Name = "Lufthansa Technik", Location = "Hamburg, Germany", Network = "Partner", Programmes = new() { "Trent XWB-84", "Trent 1000" }, AnnualCapacity = 140, ShopVisitsYtd = 71, UtilisationPercent = 84, AverageTurnaroundDays = 66, Status = "Operational" },
        new() { Id = "MRO-SIE", Name = "SIA Engineering", Location = "Singapore", Network = "Partner", Programmes = new() { "Trent 1000", "Trent 7000" }, AnnualCapacity = 120, ShopVisitsYtd = 58, UtilisationPercent = 81, AverageTurnaroundDays = 64, Status = "Operational" },
        new() { Id = "MRO-DTO", Name = "Delta TechOps", Location = "Atlanta, United States", Network = "Partner", Programmes = new() { "Trent XWB-84", "Trent 7000" }, AnnualCapacity = 110, ShopVisitsYtd = 52, UtilisationPercent = 79, AverageTurnaroundDays = 61, Status = "Operational" },
        new() { Id = "MRO-AFI", Name = "AFI KLM E&M", Location = "Paris, France", Network = "Partner", Programmes = new() { "Trent 7000", "Trent 900" }, AnnualCapacity = 95, ShopVisitsYtd = 44, UtilisationPercent = 77, AverageTurnaroundDays = 68, Status = "Operational" },
        new() { Id = "MRO-HAE", Name = "HAECO", Location = "Xiamen, China", Network = "Partner", Programmes = new() { "Trent 1000", "Trent XWB-84" }, AnnualCapacity = 90, ShopVisitsYtd = 41, UtilisationPercent = 76, AverageTurnaroundDays = 70, Status = "Operational" },
        new() { Id = "MRO-TKT", Name = "Turkish Technic", Location = "Istanbul Airport, Türkiye", Network = "Partner", Programmes = new() { "Trent XWB-84", "Trent XWB-97" }, AnnualCapacity = 120, ShopVisitsYtd = 0, UtilisationPercent = 0, AverageTurnaroundDays = 0, Status = "Under construction — operational by end 2027" }
    };

    public static List<ShopVisit> ShopVisits()
    {
        var visits = new List<ShopVisit>
        {
            New("SV-2601", "T1K-40218", "Trent 1000", "LATAM Airlines", "MRO-DER", WorkscopeLevel.Major, ShopVisitStatus.InRepair, "2026-06-04", "2026-08-12", 69, 4_850, true, false, "Phase 2 HPT modification embodied at strip."),
            New("SV-2602", "T1K-40551", "Trent 1000", "ANA", "MRO-SIE", WorkscopeLevel.Refurbishment, ShopVisitStatus.Assembly, "2026-06-22", "2026-08-04", 43, 2_150, true, false, "Refurbishment workscope selected by AiRR workscope prediction."),
            New("SV-2603", "T7K-11208", "Trent 7000", "SAS", "MRO-AFI", WorkscopeLevel.Performance, ShopVisitStatus.Test, "2026-05-18", "2026-07-28", 71, 3_420, true, false, "Post-upgrade performance restoration."),
            New("SV-2604", "XWB84-22910", "Trent XWB-84", "Delta Air Lines", "MRO-DTO", WorkscopeLevel.Major, ShopVisitStatus.Stripped, "2026-07-02", "2026-09-14", 74, 5_100, false, true, "LLP life extension paperwork pending certification."),
            New("SV-2605", "XWB84-23004", "Trent XWB-84", "Singapore Airlines", "MRO-SIN", WorkscopeLevel.Refurbishment, ShopVisitStatus.Released, "2026-04-11", "2026-06-02", 52, 1_980, false, false, "Released ahead of plan; supports AOG elimination."),
            New("SV-2606", "XWB97-30117", "Trent XWB-97", "Qantas", "MRO-DER", WorkscopeLevel.Performance, ShopVisitStatus.InductionScheduled, "2026-08-25", "2026-10-30", 66, 3_760, true, false, "Project Sunrise fleet — priority slot."),
            New("SV-2607", "T900-08813", "Trent 900", "Emirates", "MRO-SIN", WorkscopeLevel.FullOverhaul, ShopVisitStatus.InRepair, "2026-05-30", "2026-08-20", 82, 5_640, false, false, "Mature fleet overhaul with cost reduction focus."),
            New("SV-2608", "T1K-40990", "Trent 1000", "British Airways", "MRO-LHT", WorkscopeLevel.Major, ShopVisitStatus.Planned, "2026-09-08", "2026-11-19", 72, 4_930, false, false, "Awaiting slot confirmation at Hamburg."),
            New("SV-2609", "T7K-11402", "Trent 7000", "Air Asia X", "MRO-HAE", WorkscopeLevel.Refurbishment, ShopVisitStatus.Assembly, "2026-06-15", "2026-07-30", 45, 2_240, true, false, "Automated inspection tooling reduced strip time by 6 days."),
            New("SV-2610", "P700-51122", "Pearl 700", "Gulfstream Fleet Support", "MRO-DAH", WorkscopeLevel.Performance, ShopVisitStatus.Test, "2026-06-28", "2026-08-08", 41, 1_620, false, false, "Business aviation turnaround programme."),
            New("SV-2611", "XWB84-23188", "Trent XWB-84", "Cathay Pacific", "MRO-LHT", WorkscopeLevel.Major, ShopVisitStatus.InRepair, "2026-06-09", "2026-08-24", 76, 5_010, false, true, "3D-printed tooling trial for combustor removal."),
            New("SV-2612", "T1K-41077", "Trent 1000", "Norse Atlantic", "MRO-DER", WorkscopeLevel.Refurbishment, ShopVisitStatus.Planned, "2026-09-21", "2026-11-05", 45, 2_080, false, false, "Candidate for XE standard upgrade at induction.")
        };
        return visits;
    }

    private static ShopVisit New(string id, string esn, string programme, string op, string siteId,
        WorkscopeLevel workscope, ShopVisitStatus status, string induction, string release, int tat,
        double cost, bool aogRisk, bool bladeUpgrade, string notes) => new()
        {
            Id = id,
            EngineSerialNumber = esn,
            Programme = programme,
            Operator = op,
            SiteId = siteId,
            Workscope = workscope,
            Status = status,
            InductionDate = induction,
            PlannedReleaseDate = release,
            TurnaroundDays = tat,
            CostEstimateGbpK = cost,
            IsAogRisk = aogRisk,
            HpTurbineBladeUpgrade = bladeUpgrade,
            Notes = notes,
            History = new List<ShopVisitEvent>
            {
                new() { Timestamp = induction + "T08:00:00Z", Actor = "SIOP Planning", Action = "Shop visit created", Detail = $"{workscope} workscope planned at {siteId}." }
            }
        };
}
