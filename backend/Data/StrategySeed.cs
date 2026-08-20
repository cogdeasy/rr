using RR.Group.Api.Models;

namespace RR.Group.Api.Data;

public static class StrategySeed
{
    public static List<StrategicPillar> Pillars() => new()
    {
        new()
        {
            Key = "portfolio-choices",
            Name = "Portfolio choices & partnerships",
            Description = "Shape a resilient and diversified portfolio through targeted partnerships and capacity expansion."
        },
        new()
        {
            Key = "advantaged-businesses",
            Name = "Advantaged businesses & strategic initiatives",
            Description = "Grow earnings and cash through commercial optimisation, durability and aftermarket performance."
        },
        new()
        {
            Key = "efficiency-simplification",
            Name = "Efficiency & simplification",
            Description = "Phase 2 of the efficiency and simplification programme, scaling GBS and SIOP and driving lean."
        },
        new()
        {
            Key = "lower-carbon-digital",
            Name = "Lower carbon & digitally enabled businesses",
            Description = "Build the digital thread, deploy AI across MRO and engineering, and lead on lower carbon technologies."
        }
    };

    public static List<Initiative> Initiatives() => new()
    {
        Init("INI-001", "portfolio-choices", "Turkish Technic engine maintenance centre", "Civil Aerospace", "MRO Network Director", 35, "On track", "2027-12-31", "+120 shop visits annual capacity", "State-of-the-art engine maintenance centre at Istanbul Airport, targeted operational by end 2027."),
        Init("INI-002", "portfolio-choices", "Project Sunrise ultra long-haul partnership", "Civil Aerospace", "Airline Partnerships Lead", 70, "On track", "2027-06-30", "Trent XWB-97 durability demonstration", "Airbus and Qantas partnership supporting the world's longest commercial route on the A350-1000ULR."),
        Init("INI-003", "portfolio-choices", "Pearl 10X entry into service", "Civil Aerospace", "Business Aviation Programme Director", 55, "On track", "2027-03-31", "145 engine order book", "Falcon 10X first flight completed; testing continues towards final aircraft certification."),
        Init("INI-004", "portfolio-choices", "Next generation Power Systems engine", "Power Systems", "Product Development Director", 42, "On track", "2028-12-31", "+20% power density vs Series 4000", "Full system testing underway in the US facility ahead of a 2028 launch."),
        Init("INI-005", "advantaged-businesses", "Time on wing programme", "Civil Aerospace", "Chief Engineer, Large Engines", 78, "On track", "2027-12-31", ">100% durability increase", "More than 100% increase in durability across in-production engines with the majority of the improvement delivered."),
        Init("INI-006", "advantaged-businesses", "AOG elimination and sustainment", "Civil Aerospace", "Aftermarket Operations Director", 100, "Delivered", "2026-06-30", "0 aircraft on ground", "Aircraft on ground effectively eliminated, a best-in-class performance across the industry."),
        Init("INI-007", "advantaged-businesses", "Onerous contract renegotiation", "Civil Aerospace", "Commercial Director", 68, "On track", "2026-12-31", "£574m gross contractual margin improvement", "Commercial optimisation across widebody and business aviation LTSAs."),
        Init("INI-008", "advantaged-businesses", "Autonomous propulsion leadership", "Defence", "Autonomy Programme Director", 44, "On track", "2028-12-31", "£5bn UK autonomy funding addressable", "MQ-25A first flight and the German medium CCA core engine design contract."),
        Init("INI-009", "advantaged-businesses", "Data centre power generation growth", "Power Systems", "Power Generation VP", 60, "Ahead of plan", "2030-12-31", "25% OE revenue growth to 2030", "Backup and prime power demand growth, supported by framework agreements."),
        Init("INI-010", "efficiency-simplification", "Group Business Services scale-up", "Group", "GBS Director", 40, "On track", "2027-12-31", "Cost efficiency run-rate", "Phase 2 of the efficiency and simplification programme."),
        Init("INI-011", "efficiency-simplification", "SIOP transformation", "Group", "Chief Supply Chain Officer", 52, "On track", "2027-06-30", "Reduced cycle planning time", "Advanced digital planning systems driving standardisation, simplification and integration."),
        Init("INI-012", "efficiency-simplification", "Lean manufacturing productivity", "Civil Aerospace", "Manufacturing Operations Director", 65, "On track", "2027-12-31", "9% productivity improvement over two years", "Lean improvement programmes streamlining the shop visit process with automated inspection and 3D-printed tooling."),
        Init("INI-013", "lower-carbon-digital", "AiRR agent deployment across MRO", "Civil Aerospace", "Chief Digital Officer", 48, "On track", "2027-12-31", "Reduced turnaround time and shop visit cost", "AI agents improving work scope prediction and shop visit scheduling across the MRO network."),
        Init("INI-014", "lower-carbon-digital", "Digital thread across engineering, MRO and supply chain", "Group", "Chief Digital Officer", 37, "On track", "2028-06-30", "Single source of operational truth", "Gathering dispersed data into a strategic asset for better, faster decision making."),
        Init("INI-015", "lower-carbon-digital", "100% SAF readiness", "Civil Aerospace", "Sustainability Director", 72, "On track", "2027-12-31", "Contrail particulate reduction", "Pearl 700 powered the Gulfstream G800 first flight on 100% sustainable aviation fuel."),
        Init("INI-016", "lower-carbon-digital", "Battery energy storage delivery", "Power Systems", "BESS Programme Manager", 33, "On track", "2028-09-30", "576MWh contracted", "Falkirk 86MWh under construction and 490MWh contracted with Sunly in Latvia.")
    };

    private static Initiative Init(string id, string pillar, string title, string division, string owner,
        double progress, string status, string target, string valueMetric, string description) => new()
        {
            Id = id,
            PillarKey = pillar,
            Title = title,
            Division = division,
            Owner = owner,
            ProgressPercent = progress,
            Status = status,
            TargetDate = target,
            ValueMetric = valueMetric,
            Description = description,
            Updates = new List<InitiativeUpdate>
            {
                new() { Timestamp = "2026-07-30T07:00:00Z", Author = "Transformation Office", ProgressPercent = progress, Status = status, Note = "Position as reported at the 2026 Half Year Results." }
            }
        };

    public static List<PrincipalRisk> Risks() => new()
    {
        new() { Id = "RSK-01", Name = "Geopolitical instability", Category = "External", Owner = "Chief Executive", Likelihood = "High", Impact = "High", Trend = "Increasing", Mitigation = "Monitoring direct and indirect impacts of the conflict in the Middle East, with scenario planning built into SIOP." },
        new() { Id = "RSK-02", Name = "Supply chain resilience", Category = "Operational", Owner = "Chief Supply Chain Officer", Likelihood = "High", Impact = "High", Trend = "Stable", Mitigation = "£150-200m FY26 cash impact anticipated; dual sourcing, supplier support and inventory buffers in place." },
        new() { Id = "RSK-03", Name = "Product safety and durability", Category = "Operational", Owner = "Chief Engineer", Likelihood = "Medium", Impact = "High", Trend = "Decreasing", Mitigation = "Time on wing programme delivering more than 100% durability improvement by end 2027." },
        new() { Id = "RSK-04", Name = "Critical talent and capability", Category = "People", Owner = "Chief People Officer", Likelihood = "Medium", Impact = "High", Trend = "Stable", Mitigation = "Targeted attraction, retention and development plans for skills required to deliver strategic priorities." },
        new() { Id = "RSK-05", Name = "Cyber security", Category = "Technology", Owner = "Chief Information Officer", Likelihood = "Medium", Impact = "High", Trend = "Increasing", Mitigation = "Continued investment in detection and response as the digital thread expands." },
        new() { Id = "RSK-06", Name = "Climate change transition", Category = "Sustainability", Owner = "Chief Sustainability Officer", Likelihood = "Medium", Impact = "Medium", Trend = "Stable", Mitigation = "Energy strategy pillars, SAF readiness and lower carbon technology investment." },
        new() { Id = "RSK-07", Name = "Programme delivery and certification", Category = "Operational", Owner = "Divisional Presidents", Likelihood = "Medium", Impact = "Medium", Trend = "Stable", Mitigation = "Stage-gated programme governance across GCAP, SMR and next generation Power Systems engines." }
    };
}
