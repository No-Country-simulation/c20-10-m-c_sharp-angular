using AutoMapper;
using ContratApp.Models;
using ContratApp.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContratApp.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class SpecialityController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    public SpecialityController(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var specialities = await _context.Specialities.Where(c => c.IsActive).ToListAsync();
        return Ok(specialities);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        if (id <= 0) return BadRequest("ID invalido");
        var speciality = await _context.Specialities.FirstOrDefaultAsync(o => o.Id == id && o.IsActive);
        if (speciality == null) return NotFound();
        return Ok(speciality);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] SpecialityAddViewModel speciality)
    {
        var nuevoSpeciality = await _context.Specialities.AddAsync(_mapper.Map<Speciality>(speciality));
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Post), nuevoSpeciality.Entity);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] SpecialityUpdateViewModel specialityRequest)
    {
        if (id <= 0) return BadRequest("ID invalido");
        var speciality = await _context.Specialities.FindAsync(id);
        if (speciality == null) return NotFound();
        _mapper.Map(specialityRequest, speciality);
        _context.Entry(speciality).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return Ok(speciality);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        if (id <= 0) return BadRequest("ID invalido");
        var speciality = await _context.Specialities.FindAsync(id);
        if (speciality == null) return NotFound();
        speciality.IsActive = false;
        var affectedRows = await _context.SaveChangesAsync();
        bool success = affectedRows > 0;
        return Ok(success);
    }
}
