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

        // GET: api/OfferorSpecialities
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<UserSpeciality>>> GetOfferorSpecialities()
        {
            return await _context.UserSpecialities
                                 //.Include(oe => oe.Offeror)
                                 //.Include(oe => oe.Speciality)
                                 .ToListAsync();
        }

        // GET: api/OfferorSpecialities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserSpeciality>> GetOfferorSpeciality(int id)
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

        // GET: api/OfferorSpecialities/Search
        [HttpGet("Search")]
        [AllowAnonymous]
        public IActionResult GetOfferorSpecialitiesSearch([FromQuery] UserSpecialitiesSearchViewModel offerorSpecialitiesSearchViewModel)
        {

            var result = _context.UserSpecialities
                .Include(oe => oe.Speciality)
                .Include(oe => oe.User)
                .AsQueryable()
                ;
            if (!string.IsNullOrWhiteSpace(offerorSpecialitiesSearchViewModel.Criteria))
            {
                result = result.Where(x => 
                    x.Title.ToLower().Contains(offerorSpecialitiesSearchViewModel.Criteria.ToLower())
                    ||
                    x.Text.ToLower().Contains(offerorSpecialitiesSearchViewModel.Criteria.ToLower())
                );
            }
            if (offerorSpecialitiesSearchViewModel.IdSpeciality != null)
            {
                result = result.Where(x => x.IdSpeciality == offerorSpecialitiesSearchViewModel.IdSpeciality);
            }
            if (offerorSpecialitiesSearchViewModel.IdCategory != null)
            {
                result = result.Where(x => x.Speciality.CategoryId == offerorSpecialitiesSearchViewModel.IdCategory);
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

        // POST: api/OfferorSpecialities
        [HttpPost]
        public async Task<ActionResult<UserSpeciality>> PostOfferorSpeciality(UserSpeciality offerorSpeciality)
        {
            _context.UserSpecialities.Add(offerorSpeciality);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOfferorSpeciality), new { id = offerorSpeciality.Id }, offerorSpeciality);
        }

        // PUT: api/OfferorSpecialities/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOfferorSpeciality(int id, UserSpeciality offerorSpeciality)
        {
            if (id != offerorSpeciality.Id)
            {
                return BadRequest();
            }

            var existingEntity = await _context.UserSpecialities.FindAsync(id);
            if (existingEntity == null)
            {
                return NotFound();
            }

            // Modificar sólo los campos enviados en el body
            if (!string.IsNullOrWhiteSpace(offerorSpeciality.Title))
            {
                existingEntity.Title = offerorSpeciality.Title;
            }
            if (!string.IsNullOrWhiteSpace(offerorSpeciality.Text))
            {
                existingEntity.Text = offerorSpeciality.Text;
            }
            if (!string.IsNullOrWhiteSpace(offerorSpeciality.Area))
            {
                existingEntity.Area = offerorSpeciality.Area;
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
