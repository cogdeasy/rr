using Microsoft.AspNetCore.Mvc;
using RR.Group.Api.DTOs;
using RR.Group.Api.Models;
using RR.Group.Api.Services;

namespace RR.Group.Api.Controllers;

[ApiController]
[Route("api/power-systems")]
public class PowerSystemsController : ControllerBase
{
    private readonly PowerSystemsService _service;

    public PowerSystemsController(PowerSystemsService service) => _service = service;

    [HttpGet("metrics")]
    public ActionResult<PowerSystemsMetrics> GetMetrics() => Ok(_service.GetMetrics());

    [HttpGet("orders")]
    public ActionResult<IEnumerable<PowerOrder>> GetOrders([FromQuery] string? segment, [FromQuery] string? stage) =>
        Ok(_service.GetOrders(segment, stage));

    [HttpGet("orders/{id}")]
    public ActionResult<PowerOrder> GetOrder(string id)
    {
        var order = _service.GetOrder(id);
        return order is null ? NotFound() : Ok(order);
    }

    [HttpPost("orders")]
    public ActionResult<PowerOrder> CreateOrder([FromBody] CreatePowerOrderRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var order = _service.CreateOrder(request);
        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
    }

    [HttpPut("orders/{id}/advance")]
    public ActionResult<PowerOrder> AdvanceStage(string id)
    {
        var order = _service.AdvanceStage(id);
        return order is null ? NotFound() : Ok(order);
    }

    [HttpGet("bess-projects")]
    public ActionResult<IEnumerable<BessProject>> GetBessProjects() => Ok(_service.GetBessProjects());

    [HttpGet("pipeline-summary")]
    public ActionResult<object> GetPipelineSummary() => Ok(_service.GetPipelineSummary());
}
