using Microsoft.AspNetCore.Mvc;
using RR.Group.Api.DTOs;
using RR.Group.Api.Models;
using RR.Group.Api.Services;

namespace RR.Group.Api.Controllers;

[ApiController]
[Route("api/transformation")]
public class TransformationController : ControllerBase
{
    private readonly TransformationService _service;

    public TransformationController(TransformationService service) => _service = service;

    [HttpGet("pillars")]
    public ActionResult<IEnumerable<StrategicPillar>> GetPillars() => Ok(_service.GetPillars());

    [HttpGet("initiatives")]
    public ActionResult<IEnumerable<Initiative>> GetInitiatives(
        [FromQuery] string? pillarKey, [FromQuery] string? division) =>
        Ok(_service.GetInitiatives(pillarKey, division));

    [HttpGet("initiatives/{id}")]
    public ActionResult<Initiative> GetInitiative(string id)
    {
        var initiative = _service.GetInitiative(id);
        return initiative is null ? NotFound() : Ok(initiative);
    }

    [HttpPut("initiatives/{id}")]
    public ActionResult<Initiative> UpdateInitiative(string id, [FromBody] UpdateInitiativeRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var initiative = _service.UpdateInitiative(id, request);
        return initiative is null ? NotFound() : Ok(initiative);
    }

    [HttpGet("progress-summary")]
    public ActionResult<object> GetProgressSummary() => Ok(_service.GetProgressSummary());

    [HttpGet("risks")]
    public ActionResult<IEnumerable<PrincipalRisk>> GetRisks() => Ok(_service.GetRisks());
}
