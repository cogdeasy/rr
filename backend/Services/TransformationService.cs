using RR.Group.Api.Data;
using RR.Group.Api.DTOs;
using RR.Group.Api.Models;

namespace RR.Group.Api.Services;

public class TransformationService
{
    private readonly List<StrategicPillar> _pillars = StrategySeed.Pillars();
    private readonly List<Initiative> _initiatives = StrategySeed.Initiatives();
    private readonly List<PrincipalRisk> _risks = StrategySeed.Risks();
    private readonly object _lock = new();

    public IEnumerable<StrategicPillar> GetPillars()
    {
        foreach (var pillar in _pillars)
        {
            pillar.Initiatives = _initiatives.Where(i => i.PillarKey == pillar.Key).ToList();
        }

        return _pillars;
    }

    public IEnumerable<Initiative> GetInitiatives(string? pillarKey = null, string? division = null)
    {
        IEnumerable<Initiative> query = _initiatives;

        if (!string.IsNullOrWhiteSpace(pillarKey))
        {
            query = query.Where(i => i.PillarKey.Equals(pillarKey, StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrWhiteSpace(division))
        {
            query = query.Where(i => i.Division.Equals(division, StringComparison.OrdinalIgnoreCase));
        }

        return query.ToList();
    }

    public Initiative? GetInitiative(string id) =>
        _initiatives.FirstOrDefault(i => i.Id.Equals(id, StringComparison.OrdinalIgnoreCase));

    public Initiative? UpdateInitiative(string id, UpdateInitiativeRequest request)
    {
        lock (_lock)
        {
            var initiative = GetInitiative(id);
            if (initiative is null)
            {
                return null;
            }

            initiative.ProgressPercent = request.ProgressPercent;
            initiative.Status = request.Status;
            initiative.Updates.Add(new InitiativeUpdate
            {
                Timestamp = DateTime.UtcNow.ToString("o"),
                Author = request.Author,
                ProgressPercent = request.ProgressPercent,
                Status = request.Status,
                Note = request.Note
            });

            return initiative;
        }
    }

    public IEnumerable<PrincipalRisk> GetRisks() => _risks;

    public object GetProgressSummary() => new
    {
        totalInitiatives = _initiatives.Count,
        delivered = _initiatives.Count(i => i.Status == "Delivered"),
        aheadOfPlan = _initiatives.Count(i => i.Status == "Ahead of plan"),
        averageProgressPercent = Math.Round(_initiatives.Select(i => (double)i.ProgressPercent).DefaultIfEmpty(0).Average(), 1),
        byPillar = _pillars.Select(p => new
        {
            p.Key,
            p.Name,
            initiatives = _initiatives.Count(i => i.PillarKey == p.Key),
            averageProgressPercent = Math.Round(
                _initiatives.Where(i => i.PillarKey == p.Key).Select(i => i.ProgressPercent).DefaultIfEmpty(0).Average(), 1)
        }).ToList()
    };
}
