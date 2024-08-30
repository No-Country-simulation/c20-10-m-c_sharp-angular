using ContratApp.Models;
using ContratApp.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Claims;

namespace ContratApp.Controllers
{
    /// <summary>
    /// Datos de Usuario (Perfil)
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]    
    public class UsuarioController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsuarioController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Usuario
        /// <summary>
        /// Datos del usuario autenticado.
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Ok. Id, email y demás datos del perfil del usuario</response>
        /// <response code="404">No se encontraron los datos complementarios del usuario. Use PUT:api/Usuario para complementar datos</response>
        [HttpGet]
        public ActionResult<Usuario> GetUsuario()
        {
            var usuario = _context.Usuarios.Find(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (usuario == null)
                return NotFound(new { Msg = "No se encontraron los datos complementarios del usuario. Use PUT:api/Usuario para complementar datos" } );
            return usuario;
        }

        // GET: api/Usuario/Lista
        /// <summary>
        /// Lista de perfiles de usuario
        /// </summary>
        /// <returns></returns>
        [HttpGet("Lista")]
        public ActionResult<IEnumerable<Usuario>> GetListaUsuarios()
        {
            return _context.Usuarios.ToList();
        }

        // PUT: api/Usuario
        /// <summary>
        /// Actualiza datos del usuario actual
        /// </summary>
        /// <remarks>
        /// Actualiza los datos del usuario autenticado (o los declara si es la primera vez).
        /// El usuario es el detectado por el token dado
        /// </remarks>
        /// <returns>Ok</returns>
        [HttpPut]
        public IActionResult PutUsuario([FromBody] PerfilViewModel perfilViewModel)
        {
            var useR = User.FindFirst(ClaimTypes.NameIdentifier);
            var usuario = new Usuario
            {
                Id = useR.Value,
                Email = useR.Subject.Name,
                Name = perfilViewModel.Name,
                Apellido = perfilViewModel.Apellido
            };
            if (_context.Usuarios.Any(e => e.Id == usuario.Id))
                _context.Entry(usuario).State = EntityState.Modified;
            else
                _context.Entry(usuario).State = EntityState.Added;

            try
            {
                _context.SaveChanges();

                return Ok(new { Msg = "OK" });
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Msg = ex.Message } );
            }

            
        }

    }
}
