using RR.Group.Api.Data;
using RR.Group.Api.Models;

namespace RR.Group.Api.Services;

public class NuclearService
{
    private readonly List<SmrTender> _tenders = NuclearSeed.Tenders();
    private readonly List<NuclearProgramme> _programmes = NuclearSeed.Programmes();

    public IEnumerable<SmrTender> GetTenders() => _tenders;

    public IEnumerable<NuclearProgramme> GetProgrammes() => _programmes;

    public object GetSummary() => new
    {
        competitiveWins = _tenders.Count(t => t.Status is "Won" or "Execution"),
        inExecution = _tenders.Count(t => t.Status == "Execution"),
        pipelineTenders = _tenders.Count(t => t.Status == "Pipeline"),
        contractedUnits = _tenders.Where(t => t.Status is "Won" or "Execution").Sum(t => t.Units),
        pipelineUnits = _tenders.Where(t => t.Status == "Pipeline").Sum(t => t.Units),
        commentary = "Rolls-Royce SMR has been successful in every competitive European nuclear tender and is uniquely positioned to become a global market leader."
    };
}
