using RR.Group.Api.Data;
using RR.Group.Api.DTOs;
using RR.Group.Api.Models;

namespace RR.Group.Api.Services;

public class CivilAerospaceService
{
    private readonly List<EngineProgramme> _programmes = CivilSeed.Programmes();
    private readonly List<TimeOnWingWorkstream> _timeOnWing = CivilSeed.TimeOnWing();
    private readonly List<MroSite> _sites = CivilSeed.Sites();
    private readonly List<ShopVisit> _shopVisits = CivilSeed.ShopVisits();
    private readonly CivilAerospaceMetrics _metrics = CivilSeed.Metrics();
    private readonly object _lock = new();
    private int _sequence = 2612;

    public CivilAerospaceMetrics GetMetrics() => _metrics;

    public IEnumerable<EngineProgramme> GetProgrammes() => _programmes;

    public EngineProgramme? GetProgramme(string key) =>
        _programmes.FirstOrDefault(p => p.Key.Equals(key, StringComparison.OrdinalIgnoreCase));

    public IEnumerable<TimeOnWingWorkstream> GetTimeOnWing() => _timeOnWing;

    public IEnumerable<MroSite> GetSites() => _sites;

    public IEnumerable<ShopVisit> GetShopVisits(string? status = null, string? siteId = null, string? programme = null)
    {
        IEnumerable<ShopVisit> query = SnapshotShopVisits();

        if (!string.IsNullOrWhiteSpace(status) && Enum.TryParse<ShopVisitStatus>(status, true, out var parsed))
        {
            query = query.Where(v => v.Status == parsed);
        }

        if (!string.IsNullOrWhiteSpace(siteId))
        {
            query = query.Where(v => v.SiteId.Equals(siteId, StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrWhiteSpace(programme))
        {
            query = query.Where(v => v.Programme.Equals(programme, StringComparison.OrdinalIgnoreCase));
        }

        return query.OrderBy(v => v.InductionDate).ToList();
    }

    public ShopVisit? GetShopVisit(string id)
    {
        lock (_lock)
        {
            return _shopVisits.FirstOrDefault(v => v.Id.Equals(id, StringComparison.OrdinalIgnoreCase));
        }
    }

    private List<ShopVisit> SnapshotShopVisits()
    {
        lock (_lock)
        {
            return _shopVisits.ToList();
        }
    }

    public ShopVisit CreateShopVisit(CreateShopVisitRequest request)
    {
        lock (_lock)
        {
            _sequence++;
            var turnaround = EstimateTurnaround(request.Workscope, request.SiteId);
            var induction = DateTime.TryParse(request.InductionDate, out var parsedDate) ? parsedDate : DateTime.UtcNow.Date;

            var visit = new ShopVisit
            {
                Id = $"SV-{_sequence}",
                EngineSerialNumber = request.EngineSerialNumber,
                Programme = request.Programme,
                Operator = request.Operator,
                SiteId = request.SiteId,
                Workscope = request.Workscope,
                Status = ShopVisitStatus.Planned,
                InductionDate = induction.ToString("yyyy-MM-dd"),
                PlannedReleaseDate = induction.AddDays(turnaround).ToString("yyyy-MM-dd"),
                TurnaroundDays = turnaround,
                CostEstimateGbpK = EstimateCost(request.Workscope),
                IsAogRisk = request.IsAogRisk,
                HpTurbineBladeUpgrade = request.HpTurbineBladeUpgrade,
                Notes = request.Notes,
                History = new List<ShopVisitEvent>
                {
                    new()
                    {
                        Timestamp = DateTime.UtcNow.ToString("o"),
                        Actor = "SIOP Planning",
                        Action = "Shop visit created",
                        Detail = $"{request.Workscope} workscope planned at {request.SiteId}."
                    }
                }
            };

            _shopVisits.Add(visit);
            return visit;
        }
    }

    public ShopVisit? UpdateStatus(string id, UpdateShopVisitStatusRequest request)
    {
        lock (_lock)
        {
            var visit = GetShopVisit(id);
            if (visit is null)
            {
                return null;
            }

            var previous = visit.Status;
            visit.Status = request.Status;

            if (request.Status == ShopVisitStatus.Released)
            {
                visit.IsAogRisk = false;
            }

            visit.History.Add(new ShopVisitEvent
            {
                Timestamp = DateTime.UtcNow.ToString("o"),
                Actor = request.Actor,
                Action = $"Status changed {previous} to {request.Status}",
                Detail = request.Note
            });

            return visit;
        }
    }

    public bool DeleteShopVisit(string id)
    {
        lock (_lock)
        {
            var visit = GetShopVisit(id);
            return visit is not null && _shopVisits.Remove(visit);
        }
    }

    public object GetNetworkPerformance()
    {
        var visits = SnapshotShopVisits();
        var active = visits.Where(v => v.Status != ShopVisitStatus.Released).ToList();

        return new
        {
            totalShopVisits = visits.Count,
            activeShopVisits = active.Count,
            aogRisk = active.Count(v => v.IsAogRisk),
            averageTurnaroundDays = visits.Count == 0 ? 0 : Math.Round(visits.Average(v => v.TurnaroundDays), 1),
            averageCostGbpK = visits.Count == 0 ? 0 : Math.Round(visits.Average(v => v.CostEstimateGbpK), 0),
            bladeUpgradeCoveragePercent = visits.Count == 0
                ? 0
                : Math.Round(100.0 * visits.Count(v => v.HpTurbineBladeUpgrade) / visits.Count, 1),
            byStatus = Enum.GetValues<ShopVisitStatus>()
                .Select(s => new { status = s.ToString(), count = visits.Count(v => v.Status == s) })
                .ToList(),
            bySite = _sites.Select(site => new
            {
                site.Id,
                site.Name,
                site.UtilisationPercent,
                active = active.Count(v => v.SiteId == site.Id)
            }).ToList()
        };
    }

    private int EstimateTurnaround(WorkscopeLevel workscope, string siteId)
    {
        var baseline = workscope switch
        {
            WorkscopeLevel.Refurbishment => 45,
            WorkscopeLevel.Performance => 62,
            WorkscopeLevel.Major => 74,
            WorkscopeLevel.FullOverhaul => 84,
            _ => 60
        };

        var site = _sites.FirstOrDefault(s => s.Id == siteId);
        if (site is null || site.AverageTurnaroundDays == 0)
        {
            return baseline;
        }

        return (int)Math.Round((baseline + site.AverageTurnaroundDays) / 2.0);
    }

    private static double EstimateCost(WorkscopeLevel workscope) => workscope switch
    {
        WorkscopeLevel.Refurbishment => 2_100,
        WorkscopeLevel.Performance => 3_500,
        WorkscopeLevel.Major => 4_900,
        WorkscopeLevel.FullOverhaul => 5_700,
        _ => 3_500
    };
}
