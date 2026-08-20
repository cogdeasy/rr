using RR.Group.Api.Models;

namespace RR.Group.Api.Data;

public static class NuclearSeed
{
    public static List<SmrTender> Tenders() => new()
    {
        new() { Id = "SMR-SE", Country = "Sweden", Customer = "Videberg Kraft", Status = "Won", Units = 3, AwardDate = "2026-07-09", Notes = "Latest competitive win; underscores Rolls-Royce SMR as Europe's leading SMR technology." },
        new() { Id = "SMR-UK", Country = "United Kingdom", Customer = "Great British Energy - Nuclear", Status = "Execution", Units = 3, AwardDate = "2025-06-10", Notes = "Contract in execution phase, generating revenues and profits for Rolls-Royce SMR." },
        new() { Id = "SMR-CZ", Country = "Czech Republic", Customer = "CEZ Group", Status = "Execution", Units = 3, AwardDate = "2024-09-25", Notes = "Contract in execution phase; CEZ holds a 20% stake in Rolls-Royce SMR." },
        new() { Id = "SMR-NL", Country = "Netherlands", Customer = "Government of the Netherlands", Status = "Pipeline", Units = 2, AwardDate = "", Notes = "Active European pipeline opportunity." },
        new() { Id = "SMR-PL", Country = "Poland", Customer = "Industrial consortium", Status = "Pipeline", Units = 4, AwardDate = "", Notes = "Early stage engagement." }
    };

    public static List<NuclearProgramme> Programmes() => new()
    {
        new() { Id = "NUC-AMR-UK", Name = "Advanced Modular Reactor research (UK)", Technology = "AMR", Partner = "UK nuclear authorities", Stage = "Research agreement", ProgressPercent = 22, Description = "Accelerating AMR research to build a differentiated portfolio of nuclear technologies." },
        new() { Id = "NUC-AMR-JP", Name = "Advanced Modular Reactor research (Japan)", Technology = "AMR", Partner = "Japanese nuclear authorities", Stage = "Research agreement", ProgressPercent = 15, Description = "International collaboration building on unique Rolls-Royce nuclear capability." },
        new() { Id = "NUC-MICRO", Name = "Micro-reactor programme", Technology = "Micro-reactor", Partner = "UK Space Agency / MoD", Stage = "Development", ProgressPercent = 34, Description = "Compact nuclear power for defence and off-grid applications." },
        new() { Id = "NUC-CIVIL", Name = "UK Civil Nuclear services", Technology = "Civil nuclear", Partner = "UK operators", Stage = "In service", ProgressPercent = 100, Description = "Instrumentation, control and engineering services to the UK civil nuclear fleet." }
    };
}
