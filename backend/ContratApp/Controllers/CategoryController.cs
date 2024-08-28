using ContratApp.Services;
using ContratApp.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ContratApp.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _categoryService;
    public CategoryController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var categories = await _categoryService.GetAllAsync();
        return Ok(categories);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var categories = await _categoryService.GetByIdAsync(id);
        return Ok(categories);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] CategoryAddRequest category)
    {
        var newCategory = await _categoryService.CreateAsync(category);
        return CreatedAtAction(nameof(Post), newCategory);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(Guid id, [FromBody] CategoryUpdateRequest category)
    {
        var updatedCategory = await _categoryService.UpdateAsync(category);
        return Ok(updatedCategory);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _categoryService.DeleteAsync(id);
        return Ok(result);
    }
}
