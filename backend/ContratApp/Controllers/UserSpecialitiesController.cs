using AutoMapper;
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
        private readonly IMapper _mapper;

        public UserSpecialitiesController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/UserSpecialities
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<UserSpeciality>>> GetUserSpecialities()
        {
            return await _context.UserSpecialities
                                 //.Include(oe => oe.Offeror)
                                 //.Include(oe => oe.Speciality)
                                 .Where(x => x.IsActive)
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
                .Where(x => x.IsActive)
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
        public async Task<ActionResult<UserSpeciality>> PostUserSpeciality(UserSpecialityAddVM userSpecialityAddVM)
        {
            var newUserSpeciality = await _context.UserSpecialities.AddAsync(_mapper.Map<UserSpeciality>(userSpecialityAddVM));
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(newUserSpeciality), new { id = newUserSpeciality.Entity.Id }, newUserSpeciality.Entity);
        }

        // PUT: api/UserSpecialities/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserSpeciality(int id, UserSpecialityAddVM userSpecialityAddVM)
        {
            var existingEntity = await _context.UserSpecialities.FindAsync(id);
            if (existingEntity == null)
            {
                return NotFound();
            }

            // Modificar sólo los campos enviados en el body
            if (!string.IsNullOrWhiteSpace(userSpecialityAddVM.Title))
            {
                existingEntity.Title = userSpecialityAddVM.Title;
            }
            if (!string.IsNullOrWhiteSpace(userSpecialityAddVM.Text))
            {
                existingEntity.Text = userSpecialityAddVM.Text;
            }
            if (!string.IsNullOrWhiteSpace(userSpecialityAddVM.Area))
            {
                existingEntity.Area = userSpecialityAddVM.Area;
            }
            if (!string.IsNullOrWhiteSpace(userSpecialityAddVM.Latitude))
            {
                existingEntity.Latitude = userSpecialityAddVM.Latitude;
            }
            if (!string.IsNullOrWhiteSpace(userSpecialityAddVM.Longitude))
            {
                existingEntity.Longitude = userSpecialityAddVM.Longitude;
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

        /// <summary>
        /// Hace inactiva (soft delete) una publicación.
        /// </summary>
        /// <param name="id">El ID de userspeciality a ser marcado como inactivo.</param>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserSpeciality(int id)
        {
            if (id <= 0) return BadRequest();
            var userSpeciality = await _context.UserSpecialities.FindAsync(id);
            if (userSpeciality == null) return NotFound();
            userSpeciality.IsActive = false;
            var affectedRows = await _context.SaveChangesAsync();
            bool success = affectedRows > 0;
            return Ok(success);
        }
    }
}
