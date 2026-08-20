using Microsoft.AspNetCore.Mvc;
using RR.Group.Api.Models;
using RR.Group.Api.Services;

namespace RR.Group.Api.Controllers;

[ApiController]
[Route("api/group")]
public class GroupController : ControllerBase
{
    private readonly GroupPerformanceService _service;

    public GroupController(GroupPerformanceService service) => _service = service;

    [HttpGet("summary")]
    public ActionResult<GroupSummary> GetSummary() => Ok(_service.GetSummary());

    [HttpGet("divisions")]
    public ActionResult<IEnumerable<DivisionPerformance>> GetDivisions() => Ok(_service.GetDivisions());

    [HttpGet("divisions/{key}")]
    public ActionResult<DivisionPerformance> GetDivision(string key)
    {
        var division = _service.GetDivision(key);
        return division is null ? NotFound() : Ok(division);
    }

    [HttpGet("guidance")]
    public ActionResult<IEnumerable<GuidanceItem>> GetGuidance() => Ok(_service.GetGuidance());

    [HttpGet("capital")]
    public ActionResult<CapitalPosition> GetCapital() => Ok(_service.GetCapital());
}
