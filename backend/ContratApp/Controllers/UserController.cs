using ContratApp.Models;
using ContratApp.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ContratApp.Controllers
{
    /// <summary>
    /// Datos de Usuario (Perfil)
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/User
        /// <summary>
        /// Datos del usuario autenticado.
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Ok. Id, email y demás datos del perfil del usuario</response>
        /// <response code="404">No se encontraron los datos complementarios del usuario. Use PUT:api/User para complementar datos</response>
        [HttpGet]
        public ActionResult<User> GetUser()
        {
            var user = _context.Users.Find(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (user == null)
                return NotFound(new { Msg = "No se encontraron los datos complementarios del usuario. Use PUT:api/User para complementar datos" });
            return user;
        }

        // GET: api/User/List
        /// <summary>
        /// Lista de perfiles de usuario
        /// </summary>
        /// <returns></returns>
        [HttpGet("List")]
        public ActionResult<IEnumerable<User>> GetUsersList()
        {
            return _context.Users.ToList();
        }

        // PUT: api/User
        /// <summary>
        /// Actualiza datos del usuario actual
        /// </summary>
        /// <remarks>
        /// Actualiza los datos del usuario autenticado (o los declara si es la primera vez).
        /// El usuario es el detectado por el token dado
        /// </remarks>
        /// <returns>Ok</returns>
        [HttpPut]
        public IActionResult PutUser([FromBody] ProfileViewModel profileViewModel)
        {
            var useR = User.FindFirst(ClaimTypes.NameIdentifier);
            var user = new User
            {
                Id = useR.Value,
                Email = useR.Subject.Name,
                FirstName = profileViewModel.FirstName,
                LastName = profileViewModel.LastName
            };
            if (_context.Users.Any(e => e.Id == user.Id))
                _context.Entry(user).State = EntityState.Modified;
            else
                _context.Entry(user).State = EntityState.Added;

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
