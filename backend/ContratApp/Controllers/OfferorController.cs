using ContratApp.Models;
using ContratApp.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ContratApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OfferorController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OfferorController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Offeror
        [HttpGet("{id}")]
        public ActionResult<Offeror> Get()
        {
            var offeror = _context.Offerors.Find(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (offeror == null)
                return NotFound(new { Msg = "No se encontraron los datos del oferente. Use PUT:api/Offeror para ingresar datos" });

            return offeror;
        }

        // PUT: api/Offeror
        [HttpPut]
        public IActionResult Put([FromBody] OfferorViewModel offerorViewModel)
        {
            var useR = User.FindFirst(ClaimTypes.NameIdentifier);
            var user = _context.Users.Find(useR.Value);
            if (user == null)
                return NotFound(new { Msg = "No se encontraron los datos complementarios del usuario. Primero use PUT:api/User para crear el perfil del usuario" });
            var offeror = new Offeror
            {
                Id = useR.Value,
                Geolocation = offerorViewModel.Geolocation,
                User = user
            };
            if (_context.Offerors.Any(e => e.Id == offeror.Id))
                _context.Entry(offeror).State = EntityState.Modified;
            else
                _context.Entry(offeror).State = EntityState.Added;

            try
            {
                _context.SaveChanges();

                return Ok(new { Msg = "OK" });
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Msg = ex.Message });
            }


        }


    }
}
