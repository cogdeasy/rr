using Microsoft.AspNetCore.Mvc;
using RR.Group.Api.Models;
using RR.Group.Api.Services;

namespace RR.Group.Api.Controllers;

[ApiController]
[Route("api/defence")]
public class DefenceController : ControllerBase
{
    private readonly DefenceService _service;

    public DefenceController(DefenceService service) => _service = service;

    [HttpGet("metrics")]
    public ActionResult<DefenceMetrics> GetMetrics() => Ok(_service.GetMetrics());

    [HttpGet("programmes")]
    public ActionResult<IEnumerable<DefenceProgramme>> GetProgrammes(
        [FromQuery] string? sector, [FromQuery] bool? autonomous) =>
        Ok(_service.GetProgrammes(sector, autonomous));

    [HttpGet("programmes/{id}")]
    public ActionResult<DefenceProgramme> GetProgramme(string id)
    {
        var programme = _service.GetProgramme(id);
        return programme is null ? NotFound() : Ok(programme);
    }

    [HttpGet("sector-breakdown")]
    public ActionResult<object> GetSectorBreakdown() => Ok(_service.GetSectorBreakdown());
}
