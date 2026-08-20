using RR.Group.Api.Data;
using RR.Group.Api.DTOs;
using RR.Group.Api.Models;

namespace RR.Group.Api.Services;

public class PowerSystemsService
{
    private readonly List<PowerOrder> _orders = PowerSeed.Orders();
    private readonly List<BessProject> _bess = PowerSeed.BessProjects();
    private readonly PowerSystemsMetrics _metrics = PowerSeed.Metrics();
    private readonly object _lock = new();
    private int _sequence = 3010;

    public PowerSystemsMetrics GetMetrics() => _metrics;

    public IEnumerable<PowerOrder> GetOrders(string? segment = null, string? stage = null)
    {
        IEnumerable<PowerOrder> query = _orders;

        if (!string.IsNullOrWhiteSpace(segment))
        {
            query = query.Where(o => o.Segment.Equals(segment, StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrWhiteSpace(stage) && Enum.TryParse<OrderStage>(stage, true, out var parsed))
        {
            query = query.Where(o => o.Stage == parsed);
        }

        return query.OrderByDescending(o => o.ValueGbpM).ToList();
    }

    public PowerOrder? GetOrder(string id) =>
        _orders.FirstOrDefault(o => o.Id.Equals(id, StringComparison.OrdinalIgnoreCase));

    public PowerOrder CreateOrder(CreatePowerOrderRequest request)
    {
        lock (_lock)
        {
            _sequence++;
            var order = new PowerOrder
            {
                Id = $"PS-{_sequence}",
                Customer = request.Customer,
                Segment = request.Segment,
                Application = request.Application,
                Product = request.Product,
                Region = request.Region,
                ValueGbpM = request.ValueGbpM,
                Units = request.Units,
                Stage = request.Stage,
                ExpectedDelivery = request.ExpectedDelivery,
                FrameworkAgreement = request.FrameworkAgreement,
                Notes = request.Notes
            };
            _orders.Add(order);
            return order;
        }
    }

    public PowerOrder? AdvanceStage(string id)
    {
        lock (_lock)
        {
            var order = GetOrder(id);
            if (order is null || order.Stage == OrderStage.Delivered)
            {
                return order;
            }

            order.Stage = order.Stage + 1;
            return order;
        }
    }

    public IEnumerable<BessProject> GetBessProjects() => _bess;

    public object GetPipelineSummary()
    {
        var won = _orders.Where(o => o.Stage is OrderStage.Won or OrderStage.Delivered).ToList();
        var open = _orders.Where(o => o.Stage is OrderStage.Qualified or OrderStage.Proposal or OrderStage.Negotiation).ToList();

        return new
        {
            wonValueGbpM = won.Sum(o => o.ValueGbpM),
            openPipelineGbpM = open.Sum(o => o.ValueGbpM),
            byStage = Enum.GetValues<OrderStage>().Select(s => new
            {
                stage = s.ToString(),
                count = _orders.Count(o => o.Stage == s),
                valueGbpM = _orders.Where(o => o.Stage == s).Sum(o => o.ValueGbpM)
            }).ToList(),
            bySegment = _orders.GroupBy(o => o.Segment).Select(g => new
            {
                segment = g.Key,
                valueGbpM = g.Sum(o => o.ValueGbpM),
                count = g.Count()
            }).ToList(),
            totalBessCapacityMwh = _bess.Sum(b => b.CapacityMwh)
        };
    }
}
