using RR.Group.Api.Data;
using RR.Group.Api.Models;

namespace RR.Group.Api.Services;

public class GroupPerformanceService
{
    private readonly GroupSummary _summary = GroupSeed.Summary();

    public GroupSummary GetSummary() => _summary;

    public IEnumerable<DivisionPerformance> GetDivisions() => _summary.Divisions;

    public DivisionPerformance? GetDivision(string key) =>
        _summary.Divisions.FirstOrDefault(d => d.Key.Equals(key, StringComparison.OrdinalIgnoreCase));

    public IEnumerable<GuidanceItem> GetGuidance() => _summary.Guidance;

    public CapitalPosition GetCapital() => _summary.Capital;
}
