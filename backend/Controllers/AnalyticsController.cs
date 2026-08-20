using Microsoft.AspNetCore.Mvc;
using RR.Group.Api.DTOs;
using RR.Group.Api.Services;

namespace RR.Group.Api.Controllers;

[ApiController]
[Route("api/analytics")]
public class AnalyticsController : ControllerBase
{
    private readonly AnalyticsService _service;

    public AnalyticsController(AnalyticsService service) => _service = service;

    [HttpPost("workscope-prediction")]
    public ActionResult<WorkscopePrediction> PredictWorkscope([FromBody] WorkscopePredictionRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        return Ok(_service.PredictWorkscope(request));
    }

    [HttpPost("prognostics")]
    public ActionResult<PrognosticsResult> RunPrognostics([FromBody] PrognosticsRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        return Ok(_service.RunPrognostics(request));
    }

    [HttpPost("scenario")]
    public ActionResult<ScenarioResult> RunScenario([FromBody] ScenarioRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        return Ok(_service.RunScenario(request));
    }
}
