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
public class CategoriaController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    public CategoriaController(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var categorias = await _context.Categorias.Where(c => c.IsActive).ToListAsync();
        return Ok(categorias);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        if (id <= 0) return BadRequest("ID invalido");
        var categoria = await _context.Categorias.FirstOrDefaultAsync(o => o.Id == id && o.IsActive);
        if (categoria == null) return NotFound();
        return Ok(categoria);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CategoriaAddViewModel categoria)
    {
        var nuevaCategoria = await _context.Categorias.AddAsync(_mapper.Map<Categoria>(categoria));
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Post), nuevaCategoria.Entity);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] CategoriaUpdateViewModel categoriaRequest)
    {
        if (id <= 0) return BadRequest("ID invalido");
        var categoria = await _context.Categorias.FindAsync(id);
        if (categoria == null) return NotFound();
        _mapper.Map(categoriaRequest, categoria);
        _context.Entry(categoria).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return Ok(categoria);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        if (id <= 0) return BadRequest("ID invalido");
        var categoria = await _context.Categorias.FindAsync(id);
        if (categoria == null) return NotFound();
        categoria.IsActive = false;
        var filasAfectadas = await _context.SaveChangesAsync();
        bool success = filasAfectadas > 0;
        return Ok(success);
    }
}
