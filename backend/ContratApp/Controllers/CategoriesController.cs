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
public class CategoriesController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    public CategoriesController(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    /// <summary>
    /// Retrieves all categories.
    /// </summary>
    /// <remarks>
    /// Returns a list of categories.
    /// </remarks>
    /// <response code="200">Returns the list of categories.</response>
    /// <response code="401">Returns an error message if the request is not authenticated.</response>
    /// <response code="500">Internal server error if something goes wrong.</response>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Category>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [AllowAnonymous]
    public async Task<IActionResult> Get()
    {
        var categories = await _context.Categories.Where(c => c.IsActive)
            .Include(c => c.Specialities)
            .Select(x => new
            {
                CategoryId = x.Id,
                x.Name,
                x.Description,
                x.Src,
                x.CreatedAt,
                ListSpecialitiesId = x.Specialities.Select(x => x.Id).ToList(),
            })
            .ToListAsync();
        return Ok(categories);
    }

    /// <summary>
    /// Retrieves a category by its ID.
    /// </summary>
    /// <param name="id">The ID of the category.</param>
    /// <remarks>
    /// Returns the category with the specified ID.
    /// </remarks>
    /// <response code="200">Returns the category with the category ID.</response>
    /// <response code="400">Returns a bad request response if the request is invalid.</response>
    /// <response code="401">Returns an error message if the request is not authenticated.</response>
    /// <response code="404">If the category is not found.</response>
    /// <response code="500">Internal server error if something goes wrong.</response>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(Category), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [AllowAnonymous]
    public IActionResult Get(int id)
    {
        if (id <= 0) return BadRequest();
        var category = _context.Categories
            .Include(c => c.Specialities)
            .Where(o => o.Id == id && o.IsActive)
            .Select(x => new
            {
                CategoryId = x.Id,
                x.Name,
                x.Description,
                x.Src,
                x.CreatedAt,
                ListSpecialitiesId = x.Specialities.Select(x => x.Id).ToList(),
            }).First();
        if (category == null) return NotFound();
        return Ok(category);
    }

    /// <summary>
    /// Creates a new category.
    /// </summary>
    /// <param name="category">The data for the new category, provided in the request body.</param>
    /// <remarks>
    /// This endpoint accepts a JSON object representing the category to be created. 
    /// If successful, it returns a 201 Created status with the newly created category.
    /// </remarks>
    /// <response code="201">Returns the created category along with a location header pointing to the newly created resource.</response>
    /// <response code="400">Returns a bad request response if the provided data is invalid or the request is malformed.</response>
    /// <response code="401">Returns an error message if the request is not authenticated.</response>
    /// <response code="500">Returns an internal server error response if an unexpected error occurs while processing the request.</response>
    [HttpPost]
    [ProducesResponseType(typeof(Category), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Post([FromBody] CategoryAddViewModel category)
    {
        var newCategory = await _context.Categories.AddAsync(_mapper.Map<Category>(category));
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Post), newCategory.Entity);
    }

    /// <summary>
    /// Updates an existing category by its ID.
    /// </summary>
    /// <param name="id">The ID of the category to update.</param>
    /// <param name="categoryRequest">The data to update the category with, provided in the request body.</param>
    /// <remarks>
    /// This endpoint updates an existing category identified by the provided ID. 
    /// If successful, it returns the updated category.
    /// </remarks>
    /// <response code="200">Returns the updated category.</response>
    /// <response code="400">Returns a bad request response if the ID is invalid or if the request data is invalid.</response>
    /// <response code="401">Returns an error message if the request is not authenticated.</response>
    /// <response code="404">Returns a not found response if no category with the specified ID exists.</response>
    /// <response code="500">Returns an internal server error response if an unexpected error occurs while processing the request.</response>
    [HttpPut("{id}")]
    [ProducesResponseType(typeof(Category), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Put(int id, [FromBody] CategoryUpdateViewModel categoryRequest)
    {
        if (id <= 0) return BadRequest();
        var category = await _context.Categories.FindAsync(id);
        if (category == null) return NotFound();
        _mapper.Map(categoryRequest, category);
        _context.Entry(category).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return Ok(category);
    }

    /// <summary>
    /// Marks a category as inactive (soft delete) by its ID.
    /// </summary>
    /// <param name="id">The ID of the category to mark as inactive.</param>
    /// <remarks>
    /// This endpoint sets the `IsActive` property of the category to `false` instead of physically deleting it from the database. 
    /// This approach is used for soft deletion, where the data remains in the database but is no longer considered active.
    /// </remarks>
    /// <response code="200">Returns a boolean value indicating whether the update was successful.</response>
    /// <response code="400">Returns a bad request response if the ID is invalid.</response>
    /// <response code="401">Returns an error message if the request is not authenticated.</response>
    /// <response code="404">Returns a not found response if no category with the specified ID exists.</response>
    /// <response code="500">Returns an internal server error response if an unexpected error occurs while processing the request.</response>
    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Delete(int id)
    {
        if (id <= 0) return BadRequest();
        var category = await _context.Categories.FindAsync(id);
        if (category == null) return NotFound();
        category.IsActive = false;
        var affectedRows = await _context.SaveChangesAsync();
        bool success = affectedRows > 0;
        return Ok(success);
    }
}
