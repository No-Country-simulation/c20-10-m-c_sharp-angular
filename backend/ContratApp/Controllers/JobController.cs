using ContratApp.Services;
using ContratApp.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace ContratApp.Controllers;

[Route("api/[controller]")]
[ApiController]
public class JobController : ControllerBase
{
    private readonly IJobService _jobService;
    public JobController(IJobService jobService)
    {
        _jobService = jobService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var jobs = await _jobService.GetAllAsync();
        return Ok(jobs);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var job = await _jobService.GetByIdAsync(id);
        return Ok(job);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] JobAddRequest job)
    {
        var newJob = await _jobService.CreateAsync(job);
        return CreatedAtAction(nameof(Post), newJob);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(Guid id, [FromBody] JobUpdateRequest job)
    {
        var updatedJob = await _jobService.UpdateAsync(job);
        return Ok(updatedJob);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _jobService.DeleteAsync(id);
        return Ok(result);
    }
}
