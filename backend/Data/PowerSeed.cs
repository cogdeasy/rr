using RR.Group.Api.Models;

namespace RR.Group.Api.Data;

public static class PowerSeed
{
    public static PowerSystemsMetrics Metrics() => new()
    {
        OrderIntakeGbpBn = 4.6,
        BookToBill = 1.8,
        PowerGenerationOrderGrowthPercent = 55,
        GovernmentalOrderGrowthPercent = 50,
        PowerGenerationRevenueGrowthPercent = 41,
        GovernmentalRevenueGrowthPercent = 25,
        PowerGenerationOeGrowthTo2030Percent = 25,
        GovernmentalOeGrowthTo2030Percent = 20,
        OrderCover2026Percent = 100,
        OrderCover2027Percent = 50
    };

    public static List<PowerOrder> Orders() => new()
    {
        new() { Id = "PS-3001", Customer = "Hyperscale data centre operator (framework)", Segment = "Power generation", Application = "Data centre backup power", Product = "mtu Series 4000 diesel gensets", Region = "North America", ValueGbpM = 620, Units = 240, Stage = OrderStage.Won, ExpectedDelivery = "2027-Q1", FrameworkAgreement = true, Notes = "Multi-year framework providing order visibility to the mid-term." },
        new() { Id = "PS-3002", Customer = "Nordic Cloud Infrastructure", Segment = "Power generation", Application = "Prime power", Product = "mtu Series 4000 gas reciprocating engines", Region = "Europe", ValueGbpM = 310, Units = 96, Stage = OrderStage.Negotiation, ExpectedDelivery = "2027-Q3", FrameworkAgreement = false, Notes = "Growing prime power demand where grid connection is constrained." },
        new() { Id = "PS-3003", Customer = "German Armed Forces", Segment = "Governmental", Application = "Boxer armoured wheeled vehicle", Product = "mtu Series 199", Region = "Europe", ValueGbpM = 285, Units = 350, Stage = OrderStage.Won, ExpectedDelivery = "2028-Q2", FrameworkAgreement = false, Notes = "Upgraded Series 199 engines for Germany and other international customers." },
        new() { Id = "PS-3004", Customer = "Bundeswehr", Segment = "Governmental", Application = "Puma armoured personnel carrier", Product = "Compact mtu PowerPacks", Region = "Europe", ValueGbpM = 190, Units = 200, Stage = OrderStage.Won, ExpectedDelivery = "2027-Q4", FrameworkAgreement = false, Notes = "Secured in the first half of 2026." },
        new() { Id = "PS-3005", Customer = "Polska Grupa Zbrojeniowa S.A.", Segment = "Governmental", Application = "Land forces fleet services", Product = "mtu service agreement", Region = "Europe", ValueGbpM = 75, Units = 0, Stage = OrderStage.Proposal, ExpectedDelivery = "2027-Q1", FrameworkAgreement = true, Notes = "Memorandum of understanding for services to mtu engines used by the Polish Armed Forces." },
        new() { Id = "PS-3006", Customer = "APAC colocation provider", Segment = "Power generation", Application = "Data centre backup power", Product = "mtu Series 4000 diesel gensets", Region = "Asia Pacific", ValueGbpM = 240, Units = 88, Stage = OrderStage.Qualified, ExpectedDelivery = "2028-Q1", FrameworkAgreement = false, Notes = "Early stage qualification supported by regional capacity expansion." },
        new() { Id = "PS-3007", Customer = "Royal Navy support", Segment = "Governmental", Application = "Naval auxiliary power", Product = "mtu Series 4000 marine", Region = "Europe", ValueGbpM = 130, Units = 34, Stage = OrderStage.Negotiation, ExpectedDelivery = "2027-Q2", FrameworkAgreement = false, Notes = "Naval growth alongside land in governmental." },
        new() { Id = "PS-3008", Customer = "Voltaria Helios Energy Storage", Segment = "Power generation", Application = "Battery energy storage", Product = "mtu EnergyPack", Region = "Europe", ValueGbpM = 96, Units = 1, Stage = OrderStage.Delivered, ExpectedDelivery = "2026-Q4", FrameworkAgreement = false, Notes = "86MWh project under construction in Falkirk, Scotland." },
        new() { Id = "PS-3009", Customer = "Sunly", Segment = "Power generation", Application = "Battery energy storage", Product = "mtu EnergyPack", Region = "Europe", ValueGbpM = 210, Units = 4, Stage = OrderStage.Won, ExpectedDelivery = "2028-Q2", FrameworkAgreement = false, Notes = "Four large-scale BESS in Latvia totalling 490MWh." },
        new() { Id = "PS-3010", Customer = "US industrial microgrid developer", Segment = "Power generation", Application = "Prime power", Product = "Next generation engine (2028 launch)", Region = "North America", ValueGbpM = 145, Units = 40, Stage = OrderStage.Qualified, ExpectedDelivery = "2029-Q1", FrameworkAgreement = false, Notes = "Targets the next generation engine offering 20% higher power density than Series 4000." }
    };

    public static List<BessProject> BessProjects() => new()
    {
        new() { Id = "BESS-01", Name = "Falkirk Energy Storage", Customer = "Voltaria Helios Energy Storage", Country = "United Kingdom", CapacityMwh = 86, Status = "Under construction", GridConnection = "2026-Q4" },
        new() { Id = "BESS-02", Name = "Latvia BESS I", Customer = "Sunly", Country = "Latvia", CapacityMwh = 140, Status = "Contracted", GridConnection = "2027-Q4" },
        new() { Id = "BESS-03", Name = "Latvia BESS II", Customer = "Sunly", Country = "Latvia", CapacityMwh = 120, Status = "Contracted", GridConnection = "2028-Q1" },
        new() { Id = "BESS-04", Name = "Latvia BESS III", Customer = "Sunly", Country = "Latvia", CapacityMwh = 120, Status = "Contracted", GridConnection = "2028-Q2" },
        new() { Id = "BESS-05", Name = "Latvia BESS IV", Customer = "Sunly", Country = "Latvia", CapacityMwh = 110, Status = "Contracted", GridConnection = "2028-Q3" }
    };
}
