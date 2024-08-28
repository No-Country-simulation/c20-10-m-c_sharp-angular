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
        [HttpGet]
        public ActionResult<Usuario> GetUsuarios()
        {
            return _context.Usuarios.Find(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        }

        // GET: api/Usuario/Lista
        [HttpGet("Lista")]
        public ActionResult<IEnumerable<Usuario>> GetListaUsuarios()
        {
            return _context.Usuarios.ToList();
        }

        // PUT: api/Usuario
        [HttpPut]
        public IActionResult PutUsuario([FromBody] PerfilViewModel perfilViewModel)
        {
            var Msg = "Ok";
            var useR = User.FindFirst(ClaimTypes.NameIdentifier);
            var usuario = new Usuario
            {
                Id = useR.Value,
                Email = useR.Subject.Name,
                Nombre = perfilViewModel.Nombre,
                Apellido = perfilViewModel.Apellido
            };
            if (_context.Usuarios.Any(e => e.Id == usuario.Id))
            {
                _context.Entry(usuario).State = EntityState.Modified;
            }
            else
            {
                _context.Entry(usuario).State = EntityState.Added;
            }

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                Msg = ex.Message;
            }

            //return NoContent();
            //return Ok(new { ID = 99, Msg = "Ok" });
            //return Ok(new { ID = $"{userId} - {useR.Subject.Name}", Msg = "Ok" });
            return Ok(new { Msg });
        }

        //private bool UsuarioExists(int id)
        //{
        //    return _context.Usuarios.Any(e => e.Id == id);
        //}
    }
}
