using ContratApp.Models;
using ContratApp.ViewModels;
using Microsoft.AspNetCore.Authorization;
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
            var loggedUser = User.FindFirst(ClaimTypes.NameIdentifier);
            var loggedUserId = loggedUser.Value;
            var user = _context.Users
                .Include(ue => ue.UserSpecialities.Where(x => x.IsActive))
                .FirstOrDefault(x => x.Id == loggedUserId);
                
            if (user == null)
                return NotFound(new { Msg = "No se encontraron los datos complementarios del usuario. Use PUT:api/User para complementar datos" });
            if (user.UserSpecialities != null)
            {
                foreach (var us in user.UserSpecialities)
                {
                    us.Speciality = null;
                    us.User = null;
                }
            }
            return user;
        }

        // GET: api/User/id
        /// <summary>
        /// Datos de un usuario pasando su id
        /// </summary>
        /// <returns></returns>
        /// <response code="200">Ok. Id, email y demás datos del perfil del usuario</response>
        /// <response code="404">No se encontraron los datos complementarios del usuario.</response>
        [HttpGet("{id}")]
        [AllowAnonymous]
        public ActionResult<User> GetUser(string id)
        {
            var user = _context.Users
                .Include(ue => ue.UserSpecialities.Where(x => x.IsActive))
                .FirstOrDefault(x => x.Id == id);

            if (user == null)
                return NotFound(new { Msg = "No se encontraron los datos complementarios del usuario." });
            if (user.UserSpecialities != null)
            {
                foreach (var us in user.UserSpecialities)
                {
                    us.Speciality = null;
                    us.User = null;
                }
            }
            return user;
        }

        // GET: api/User/List
        /// <summary>
        /// Lista de perfiles de usuario
        /// </summary>
        /// <returns></returns>
        [HttpGet("List")]
        [AllowAnonymous]
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
            var loggedInUser = User.FindFirst(ClaimTypes.NameIdentifier);
            var loggedInUserId = loggedInUser.Value;
            var existingUser = _context.Users.Find(loggedInUserId);
            if (existingUser == null)
            {
                var newUser = new User
                {
                    Id=loggedInUserId,
                    Email = loggedInUser.Subject.Name,
                    FirstName = profileViewModel.FirstName,
                    LastName = profileViewModel.LastName,
                    DNI = profileViewModel.DNI,
                    BirthDay = profileViewModel.BirthDay,
                    Country = profileViewModel.Country,
                    State = profileViewModel.State,
                    Location = profileViewModel.Location,
                    Cellphone = profileViewModel.Cellphone
                };
                _context.Entry(newUser).State = EntityState.Added;
            }
            else {

                if (!string.IsNullOrWhiteSpace(profileViewModel.FirstName))
                {
                    existingUser.FirstName = profileViewModel.FirstName;
                }
                if (!string.IsNullOrWhiteSpace(profileViewModel.LastName))
                {
                    existingUser.LastName = profileViewModel.LastName;
                }
                if (!string.IsNullOrWhiteSpace(profileViewModel.DNI))
                {
                    existingUser.DNI = profileViewModel.DNI;
                }
                if (profileViewModel.BirthDay != null)
                {
                    existingUser.BirthDay = profileViewModel.BirthDay;
                }
                if (!string.IsNullOrWhiteSpace(profileViewModel.Country))
                {
                    existingUser.Country = profileViewModel.Country;
                }
                if (!string.IsNullOrWhiteSpace(profileViewModel.State))
                {
                    existingUser.State = profileViewModel.State;
                }
                if (!string.IsNullOrWhiteSpace(profileViewModel.Location))
                {
                    existingUser.Location = profileViewModel.Location;
                }
                if (!string.IsNullOrWhiteSpace(profileViewModel.SrcImage))
                {
                    existingUser.SrcImage = profileViewModel.SrcImage;
                }
                if (!string.IsNullOrWhiteSpace(profileViewModel.Cellphone))
                {
                    existingUser.Cellphone = profileViewModel.Cellphone;
                }
                if (profileViewModel.ContactByPhone != null)
                {
                    existingUser.ContactByPhone = profileViewModel.ContactByPhone;
                }
                if (profileViewModel.ContactByEmail != null)
                {
                    existingUser.ContactByEmail = profileViewModel.ContactByEmail;
                }
                if (profileViewModel.MercadoPago != null)
                {
                    existingUser.MercadoPago = profileViewModel.MercadoPago;
                }
                if (profileViewModel.CreditCard != null)
                {
                    existingUser.CreditCard = profileViewModel.CreditCard;
                }
                if (profileViewModel.Cash != null)
                {
                    existingUser.Cash = profileViewModel.Cash;
                }
                if (!string.IsNullOrWhiteSpace(profileViewModel.Latitude))
                {
                    existingUser.Latitude = profileViewModel.Latitude;
                }
                if (!string.IsNullOrWhiteSpace(profileViewModel.Longitude))
                {
                    existingUser.Longitude = profileViewModel.Longitude;
                }

                _context.Entry(existingUser).State = EntityState.Modified;
            }
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

        #region Chat - Message

        // GET: api/user/messages
        [HttpGet("Messages")]
        public IActionResult GetMessages()
        {
            var loggedInUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var chats = _context.Chats
                .Include(x => x.Messages)
                .Where(x => x.IdUser == loggedInUserId
                || x.IdOtherUser == loggedInUserId);

            if (chats == null)
                return NotFound();

            var chats2 = chats.Select(x => new
            {
                x.Id,
                idOtherUser = (x.IdUser == loggedInUserId) ? x.IdOtherUser : x.IdUser,
                Name = _context.Users.Where(y => y.Id == ((x.IdUser == loggedInUserId) ? x.IdOtherUser : x.IdUser)).Select(x => x.FirstName + " " + x.LastName).FirstOrDefault(),
                x.Image,
                x.CreatedAt,
                Messages = x.Messages.Where(y => y.IdChat == x.Id).Select(x => new
                {
                    x.Id,
                    Message = x.Text,
                    x.CreatedAt,
                    x.UserId
                }).ToList()
            }
                );
            return Ok(chats2);
        }

        // GET: api/user/messages/5bd69c48-10b7-47da-9dbb-845500079fd1
        [HttpGet("Messages/{idOtherUser}")]
        public IActionResult GetMessages(string idOtherUser)
        {
            var loggedInUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var chat = _context.Chats
                .Include(x => x.Messages)
                .FirstOrDefault(x => x.IdUser == loggedInUserId && x.IdOtherUser == idOtherUser
                || x.IdOtherUser == loggedInUserId && x.IdUser == idOtherUser);

            if (chat == null)
                return NotFound();
            return Ok(
                    new
                    {
                        id = chat.Id,
                        idOtherUser,
                        Name = _context.Users.Where(x => x.Id == idOtherUser).Select(x => x.FirstName + " " + x.LastName).FirstOrDefault(),
                        chat.Image,
                        chat.CreatedAt,
                        Messages = chat.Messages.Where(y => y.IdChat == chat.Id).Select(x => new
                        {
                            x.Id,
                            Message = x.Text,
                            x.CreatedAt,
                            x.UserId
                        }).ToList()
                    }
                );
        }

        // POST: api/user/messages/5bd69c48-10b7-47da-9dbb-845500079fd1
        [HttpPost("Messages/{idOtherUser}")]
        public IActionResult PostMessage(string idOtherUser, [FromBody] MessageAddViewModel messageAddViewModel)
        {
            var UserId = (string.IsNullOrWhiteSpace(messageAddViewModel.userId)) 
                ? User.FindFirst(ClaimTypes.NameIdentifier).Value
                : messageAddViewModel.userId;
            var chat = _context.Chats
//                .Include(x => x.Messages)
                .FirstOrDefault(x => x.IdUser == UserId && x.IdOtherUser == idOtherUser
                || x.IdOtherUser == UserId && x.IdUser == idOtherUser);
            if (chat == null)
            {
                chat = new Chat
                {
                    IdUser = UserId,
                    IdOtherUser = idOtherUser,
                    Image = ""
                };
                _context.Entry(chat).State = EntityState.Added;
                try
                {
                    _context.SaveChanges();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new { Msg = ex.Message });
                }
            }
            var message = new Message
            {
                IdChat = chat.Id,
                Text = messageAddViewModel.Message,
                UserId = UserId,
            };
            if (messageAddViewModel.createdAt != null)
                message.CreatedAt = (DateTime)messageAddViewModel.createdAt;

            _context.Entry(message).State = EntityState.Added;
            try
            {
                _context.SaveChanges();

                //return StatusCode(StatusCodes.Status201Created);
                return Ok(new {chatId = chat.Id, messageId = message.Id});
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { Msg = ex.Message });
            }


        }

        #endregion

    }
}
