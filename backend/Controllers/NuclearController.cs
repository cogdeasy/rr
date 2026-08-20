using Microsoft.AspNetCore.Mvc;
using RR.Group.Api.Models;
using RR.Group.Api.Services;

namespace RR.Group.Api.Controllers;

[ApiController]
[Route("api/nuclear")]
public class NuclearController : ControllerBase
{
    private readonly NuclearService _service;

    public NuclearController(NuclearService service) => _service = service;

    [HttpGet("tenders")]
    public ActionResult<IEnumerable<SmrTender>> GetTenders() => Ok(_service.GetTenders());

    [HttpGet("programmes")]
    public ActionResult<IEnumerable<NuclearProgramme>> GetProgrammes() => Ok(_service.GetProgrammes());

    [HttpGet("summary")]
    public ActionResult<object> GetSummary() => Ok(_service.GetSummary());
}
