using ContratApp.Models;
using ContratApp.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContratApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserSpecialitiesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserSpecialitiesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/UserSpecialities
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<UserSpeciality>>> GetUserSpecialities()
        {
            return await _context.UserSpecialities
                                 //.Include(oe => oe.Offeror)
                                 //.Include(oe => oe.Speciality)
                                 .ToListAsync();
        }

        // GET: api/UserSpecialities/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<UserSpeciality>> GetUserSpeciality(int id)
        {
            var oferenteEspecialidad = await _context.UserSpecialities
                                                     //.Include(oe => oe.Offeror)
                                                     //.Include(oe => oe.Speciality)
                                                     .FirstOrDefaultAsync(oe => oe.Id == id);

            if (oferenteEspecialidad == null)
            {
                return NotFound();
            }

            return oferenteEspecialidad;
        }

        // GET: api/UserSpecialities/Search
        [HttpGet("Search")]
        [AllowAnonymous]
        public IActionResult GetUserSpecialitiesSearch([FromQuery] UserSpecialitiesSearchViewModel userSpecialitiesSearchViewModel)
        {

            var result = _context.UserSpecialities
                .Include(oe => oe.Speciality)
                .Include(oe => oe.User)
                .AsQueryable()
                ;
            if (!string.IsNullOrWhiteSpace(userSpecialitiesSearchViewModel.Criteria))
            {
                result = result.Where(x => 
                    x.Title.ToLower().Contains(userSpecialitiesSearchViewModel.Criteria.ToLower())
                    ||
                    x.Text.ToLower().Contains(userSpecialitiesSearchViewModel.Criteria.ToLower())
                );
            }
            if (userSpecialitiesSearchViewModel.IdSpeciality != null)
            {
                result = result.Where(x => x.IdSpeciality == userSpecialitiesSearchViewModel.IdSpeciality);
            }
            if (userSpecialitiesSearchViewModel.IdCategory != null)
            {
                result = result.Where(x => x.Speciality.CategoryId == userSpecialitiesSearchViewModel.IdCategory);
            }

            return Ok(result.Select(x => new
            {
                UserSpecialityId = x.Id,
                x.IdUser,
                UserName = x.User.FirstName + " " + x.User.LastName,
                x.IdSpeciality,
                SpecialityName = x.Speciality.Name,
                x.Speciality.CategoryId,
                x.Title,
                x.Text,
                Rating = 5.0f,
                x.Area
            })
                .ToList()
            );
        }

        // POST: api/UserSpecialities
        [HttpPost]
        public async Task<ActionResult<UserSpeciality>> PostUserSpeciality(UserSpeciality userSpeciality)
        {
            _context.UserSpecialities.Add(userSpeciality);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(userSpeciality), new { id = userSpeciality.Id }, userSpeciality);
        }

        // PUT: api/UserSpecialities/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserSpeciality(int id, UserSpeciality userSpeciality)
        {
            if (id != userSpeciality.Id)
            {
                return BadRequest();
            }

            var existingEntity = await _context.UserSpecialities.FindAsync(id);
            if (existingEntity == null)
            {
                return NotFound();
            }

            // Modificar sólo los campos enviados en el body
            if (!string.IsNullOrWhiteSpace(userSpeciality.Title))
            {
                existingEntity.Title = userSpeciality.Title;
            }
            if (!string.IsNullOrWhiteSpace(userSpeciality.Text))
            {
                existingEntity.Text = userSpeciality.Text;
            }
            if (!string.IsNullOrWhiteSpace(userSpeciality.Area))
            {
                existingEntity.Area = userSpeciality.Area;
            }

            _context.Entry(existingEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.UserSpecialities.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
    }
}
