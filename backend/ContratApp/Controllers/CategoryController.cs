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
public class CategoryController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    public CategoryController(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var categories = await _context.Categories.Where(c => c.IsActive).ToListAsync();
        return Ok(categories);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        if (id <= 0) return BadRequest("Invalid ID");
        var category = await _context.Categories.FirstOrDefaultAsync(o => o.Id == id && o.IsActive);
        if (category == null) return NotFound();
        return Ok(category);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CategoryAddViewModel category)
    {
        var newCategory = await _context.Categories.AddAsync(_mapper.Map<Category>(category));
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Post), newCategory.Entity);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] CategoryUpdateViewModel categoryRequest)
    {
        if (id <= 0) return BadRequest("Invalid ID");
        var category = await _context.Categories.FindAsync(id);
        if (category == null) return NotFound();
        _mapper.Map(categoryRequest, category);
        _context.Entry(category).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return Ok(category);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        if (id <= 0) return BadRequest("Invalid ID");
        var category = await _context.Categories.FindAsync(id);
        if (category == null) return NotFound();
        category.IsActive = false;
        var affectedRows = await _context.SaveChangesAsync();
        bool success = affectedRows > 0;
        return Ok(success);
    }
}
