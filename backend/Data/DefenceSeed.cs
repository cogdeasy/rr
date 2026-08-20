using RR.Group.Api.Models;

namespace RR.Group.Api.Data;

public static class DefenceSeed
{
    public static DefenceMetrics Metrics() => new()
    {
        OrderIntakeGbpBn = 2.4,
        BookToBill = 1.0,
        OrderBacklogGbpBn = 17.5,
        OrderCoverPercent = 90,
        RevenueGrowthPercent = 17,
        CombatGrowthPercent = 12,
        SubmarinesGrowthPercent = 14,
        TransportGrowthPercent = 14,
        GcapFundingGbpBn = 8.6,
        AutonomyFundingGbpBn = 5.0
    };

    public static List<DefenceProgramme> Programmes() => new()
    {
        new()
        {
            Id = "DEF-GCAP", Name = "Global Combat Air Programme", Sector = "Combat", Platform = "GCAP demonstrator",
            Customer = "UK Ministry of Defence", Product = "Next generation combat propulsion", OrderValueGbpM = 8_600,
            Phase = "Development", Autonomous = false, ProgressPercent = 38,
            LatestMilestone = "UK Defence Investment Plan pledged £8.6bn to GCAP to the end of the decade",
            MilestoneDate = "2026-05-14"
        },
        new()
        {
            Id = "DEF-EJ200", Name = "EUROJET EJ200", Sector = "Combat", Platform = "Eurofighter Typhoon",
            Customer = "Türkiye", Product = "EJ200 engines", OrderValueGbpM = 940,
            Phase = "Contract award", Autonomous = false, ProgressPercent = 20,
            LatestMilestone = "Award to the EUROJET consortium for engines powering 20 new Eurofighter Typhoons",
            MilestoneDate = "2026-03-19"
        },
        new()
        {
            Id = "DEF-MQ25", Name = "MQ-25A Stingray", Sector = "Autonomous", Platform = "Carrier-based autonomous tanker",
            Customer = "U.S. Navy", Product = "AE 3007N", OrderValueGbpM = 610,
            Phase = "Flight test", Autonomous = true, ProgressPercent = 62,
            LatestMilestone = "First flight completed, autonomously executing a digitally programmed mission plan",
            MilestoneDate = "2026-04-08"
        },
        new()
        {
            Id = "DEF-CCA", Name = "Medium CCA core engine", Sector = "Autonomous", Platform = "Collaborative Combat Aircraft",
            Customer = "Germany", Product = "Scalable core engine concept", OrderValueGbpM = 180,
            Phase = "Design", Autonomous = true, ProgressPercent = 24,
            LatestMilestone = "Under contract to design a scalable core adaptable across multiple autonomous platforms",
            MilestoneDate = "2026-02-26"
        },
        new()
        {
            Id = "DEF-AUKUS", Name = "AUKUS submarine propulsion", Sector = "Submarines", Platform = "SSN-AUKUS",
            Customer = "UK Ministry of Defence", Product = "Nuclear reactor plant", OrderValueGbpM = 4_200,
            Phase = "Build", Autonomous = false, ProgressPercent = 31,
            LatestMilestone = "Defence Investment Plan confirmed long-term visibility for AUKUS and CASD",
            MilestoneDate = "2026-05-14"
        },
        new()
        {
            Id = "DEF-MT30", Name = "MT30 marine gas turbine", Sector = "Naval", Platform = "Mogami-class frigate",
            Customer = "Royal Australian Navy", Product = "MT30", OrderValueGbpM = 720,
            Phase = "Selection", Autonomous = false, ProgressPercent = 18,
            LatestMilestone = "Selected to power up to 11 general-purpose frigates for the Australian Navy",
            MilestoneDate = "2026-04-22"
        },
        new()
        {
            Id = "DEF-MV75", Name = "MV-75 Cheyenne", Sector = "Transport", Platform = "U.S. Army future long-range assault aircraft",
            Customer = "U.S. Army", Product = "AE 1107", OrderValueGbpM = 480,
            Phase = "Engine test", Autonomous = false, ProgressPercent = 47,
            LatestMilestone = "Engine testing progressing well; first flight test engines due later this year",
            MilestoneDate = "2026-06-11"
        },
        new()
        {
            Id = "DEF-F130", Name = "F-130 B-52 re-engine", Sector = "Transport", Platform = "B-52 Stratofortress",
            Customer = "U.S. Air Force", Product = "F130", OrderValueGbpM = 1_150,
            Phase = "Systems integration", Autonomous = false, ProgressPercent = 55,
            LatestMilestone = "Completed altitude and operating tests; progressing dual-pod testing",
            MilestoneDate = "2026-06-30"
        },
        new()
        {
            Id = "DEF-TRITON", Name = "MQ-4C Triton", Sector = "Autonomous", Platform = "High altitude maritime surveillance",
            Customer = "NATO members", Product = "AE 3007H", OrderValueGbpM = 240,
            Phase = "Order pipeline", Autonomous = true, ProgressPercent = 12,
            LatestMilestone = "NATO summit commitments support Triton and SAAB GlobalEye demand",
            MilestoneDate = "2026-06-25"
        }
    };
}
