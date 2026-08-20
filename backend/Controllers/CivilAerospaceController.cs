using Microsoft.AspNetCore.Mvc;
using RR.Group.Api.DTOs;
using RR.Group.Api.Models;
using RR.Group.Api.Services;

namespace RR.Group.Api.Controllers;

[ApiController]
[Route("api/civil-aerospace")]
public class CivilAerospaceController : ControllerBase
{
    private readonly CivilAerospaceService _service;

    public CivilAerospaceController(CivilAerospaceService service) => _service = service;

    [HttpGet("metrics")]
    public ActionResult<CivilAerospaceMetrics> GetMetrics() => Ok(_service.GetMetrics());

    [HttpGet("programmes")]
    public ActionResult<IEnumerable<EngineProgramme>> GetProgrammes() => Ok(_service.GetProgrammes());

    [HttpGet("programmes/{key}")]
    public ActionResult<EngineProgramme> GetProgramme(string key)
    {
        var programme = _service.GetProgramme(key);
        return programme is null ? NotFound() : Ok(programme);
    }

    [HttpGet("time-on-wing")]
    public ActionResult<IEnumerable<TimeOnWingWorkstream>> GetTimeOnWing() => Ok(_service.GetTimeOnWing());

    [HttpGet("sites")]
    public ActionResult<IEnumerable<MroSite>> GetSites() => Ok(_service.GetSites());

    [HttpGet("network-performance")]
    public ActionResult<object> GetNetworkPerformance() => Ok(_service.GetNetworkPerformance());

    [HttpGet("shop-visits")]
    public ActionResult<IEnumerable<ShopVisit>> GetShopVisits(
        [FromQuery] string? status, [FromQuery] string? siteId, [FromQuery] string? programme) =>
        Ok(_service.GetShopVisits(status, siteId, programme));

    [HttpGet("shop-visits/{id}")]
    public ActionResult<ShopVisit> GetShopVisit(string id)
    {
        var visit = _service.GetShopVisit(id);
        return visit is null ? NotFound() : Ok(visit);
    }

    [HttpPost("shop-visits")]
    public ActionResult<ShopVisit> CreateShopVisit([FromBody] CreateShopVisitRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var visit = _service.CreateShopVisit(request);
        return CreatedAtAction(nameof(GetShopVisit), new { id = visit.Id }, visit);
    }

    [HttpPut("shop-visits/{id}/status")]
    public ActionResult<ShopVisit> UpdateStatus(string id, [FromBody] UpdateShopVisitStatusRequest request)
    {
        var visit = _service.UpdateStatus(id, request);
        return visit is null ? NotFound() : Ok(visit);
    }

    [HttpDelete("shop-visits/{id}")]
    public IActionResult DeleteShopVisit(string id) => _service.DeleteShopVisit(id) ? NoContent() : NotFound();
}
