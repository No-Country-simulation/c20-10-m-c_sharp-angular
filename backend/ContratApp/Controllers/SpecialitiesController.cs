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
public class SpecialitiesController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    public SpecialitiesController(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    /// <summary>
    /// Retrieves all specialities.
    /// </summary>
    /// <remarks>
    /// This endpoint returns a list of all specialities available in the system.
    /// </remarks>
    /// <response code="200">Returns a list of specialities.</response>
    /// <response code="401">Returns an error message if the request is not authenticated.</response>
    /// <response code="500">Returns an internal server error response if an unexpected error occurs while processing the request.</response>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Speciality>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Get()
    {
        var specialities = await _context.Specialities.Where(c => c.IsActive).ToListAsync();
        return Ok(specialities);
    }

    /// <summary>
    /// Retrieves a speciality by its ID.
    /// </summary>
    /// <param name="id">The ID of the speciality to retrieve.</param>
    /// <remarks>
    /// This endpoint returns the speciality with the specified ID if it exists.
    /// </remarks>
    /// <response code="200">Returns the speciality with the specified ID.</response>
    /// <response code="400">Returns a bad request response if the provided ID is invalid.</response>
    /// <response code="401">Returns an error message if the request is not authenticated.</response>
    /// <response code="404">Returns a not found response if no speciality with the specified ID exists.</response>
    /// <response code="500">Returns an internal server error response if an unexpected error occurs while processing the request.</response>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(Speciality), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Get(int id)
    {
        if (id <= 0) return BadRequest();
        var speciality = await _context.Specialities.FirstOrDefaultAsync(o => o.Id == id && o.IsActive);
        if (speciality == null) return NotFound();
        return Ok(speciality);
    }

    /// <summary>
    /// Creates a new speciality.
    /// </summary>
    /// <param name="speciality">The data for the new speciality, provided in the request body.</param>
    /// <remarks>
    /// This endpoint accepts a JSON object representing the speciality to be created. 
    /// If successful, it returns a 201 Created status with the newly created speciality.
    /// </remarks>
    /// <response code="201">Returns the created speciality along with a location header pointing to the newly created resource.</response>
    /// <response code="400">Returns a bad request response if the provided data is invalid or the request is malformed.</response>
    /// <response code="401">Returns an error message if the request is not authenticated.</response>
    /// <response code="500">Returns an internal server error response if an unexpected error occurs while processing the request.</response>
    [HttpPost]
    [ProducesResponseType(typeof(Speciality), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Post([FromBody] SpecialityAddViewModel speciality)
    {
        var nuevoSpeciality = await _context.Specialities.AddAsync(_mapper.Map<Speciality>(speciality));
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Post), nuevoSpeciality.Entity);
    }

    /// <summary>
    /// Updates an existing speciality by its ID.
    /// </summary>
    /// <param name="id">The ID of the speciality to update.</param>
    /// <param name="specialityRequest">The data to update the speciality with, provided in the request body.</param>
    /// <remarks>
    /// This endpoint updates an existing speciality identified by the provided ID. 
    /// If successful, it returns the updated speciality.
    /// </remarks>
    /// <response code="200">Returns the updated speciality.</response>
    /// <response code="400">Returns a bad request response if the ID is invalid or if the request data is invalid.</response>
    /// <response code="401">Returns an error message if the request is not authenticated.</response>
    /// <response code="404">Returns a not found response if no speciality with the specified ID exists.</response>
    /// <response code="500">Returns an internal server error response if an unexpected error occurs while processing the request.</response>
    [HttpPut("{id}")]
    [ProducesResponseType(typeof(Speciality), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Put(int id, [FromBody] SpecialityUpdateViewModel specialityRequest)
    {
        if (id <= 0) return BadRequest();
        var speciality = await _context.Specialities.FindAsync(id);
        if (speciality == null) return NotFound();
        _mapper.Map(specialityRequest, speciality);
        _context.Entry(speciality).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return Ok(speciality);
    }

    /// <summary>
    /// Marks a speciality as inactive (soft delete) by its ID.
    /// </summary>
    /// <param name="id">The ID of the speciality to mark as inactive.</param>
    /// <remarks>
    /// This endpoint sets the `IsActive` property of the speciality to `false` instead of physically deleting it from the database. 
    /// This approach is used for soft deletion, where the data remains in the database but is no longer considered active.
    /// </remarks>
    /// <response code="200">Returns a boolean value indicating whether the update was successful.</response>
    /// <response code="400">Returns a bad request response if the provided ID is invalid.</response>
    /// <response code="401">Returns an error message if the request is not authenticated.</response>
    /// <response code="404">Returns a not found response if no speciality with the specified ID exists.</response>
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
        var speciality = await _context.Specialities.FindAsync(id);
        if (speciality == null) return NotFound();
        speciality.IsActive = false;
        var affectedRows = await _context.SaveChangesAsync();
        bool success = affectedRows > 0;
        return Ok(success);
    }
}
