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
public class OficioController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    public OficioController(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var oficios = await _context.Oficios.Where(c => c.IsActive).ToListAsync();
        return Ok(oficios);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        if (id <= 0) return BadRequest("ID invalido");
        var oficio = await _context.Oficios.FirstOrDefaultAsync(o => o.Id == id && o.IsActive);
        if (oficio == null) return NotFound();
        return Ok(oficio);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] OficioAddViewModel oficio)
    {
        var nuevoOficio = await _context.Oficios.AddAsync(_mapper.Map<Oficio>(oficio));
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Post), nuevoOficio.Entity);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] OficioUpdateViewModel oficioRequest)
    {
        if (id <= 0) return BadRequest("ID invalido");
        var oficio = await _context.Oficios.FindAsync(id);
        if (oficio == null) return NotFound();
        _mapper.Map(oficioRequest, oficio);
        _context.Entry(oficio).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return Ok(oficio);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        if (id <= 0) return BadRequest("ID invalido");
        var oficio = await _context.Oficios.FindAsync(id);
        if (oficio == null) return NotFound();
        oficio.IsActive = false;
        var filasAfectadas = await _context.SaveChangesAsync();
        bool success = filasAfectadas > 0;
        return Ok(success);
    }
}
