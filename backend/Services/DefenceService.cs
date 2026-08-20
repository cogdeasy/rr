using RR.Group.Api.Data;
using RR.Group.Api.Models;

namespace RR.Group.Api.Services;

public class DefenceService
{
    private readonly List<DefenceProgramme> _programmes = DefenceSeed.Programmes();
    private readonly DefenceMetrics _metrics = DefenceSeed.Metrics();

    public DefenceMetrics GetMetrics() => _metrics;

    public IEnumerable<DefenceProgramme> GetProgrammes(string? sector = null, bool? autonomous = null)
    {
        IEnumerable<DefenceProgramme> query = _programmes;

        if (!string.IsNullOrWhiteSpace(sector))
        {
            query = query.Where(p => p.Sector.Equals(sector, StringComparison.OrdinalIgnoreCase));
        }

        if (autonomous.HasValue)
        {
            query = query.Where(p => p.Autonomous == autonomous.Value);
        }

        return query.OrderByDescending(p => p.OrderValueGbpM).ToList();
    }

    public DefenceProgramme? GetProgramme(string id) =>
        _programmes.FirstOrDefault(p => p.Id.Equals(id, StringComparison.OrdinalIgnoreCase));

    public object GetSectorBreakdown() => _programmes
        .GroupBy(p => p.Sector)
        .Select(g => new
        {
            sector = g.Key,
            programmes = g.Count(),
            valueGbpM = g.Sum(p => p.OrderValueGbpM),
            averageProgressPercent = Math.Round(g.Average(p => p.ProgressPercent), 1)
        })
        .OrderByDescending(x => x.valueGbpM)
        .ToList();
}
