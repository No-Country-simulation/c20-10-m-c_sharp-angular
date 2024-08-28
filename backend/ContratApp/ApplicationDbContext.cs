using ContratApp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ContratApp
{
    public class ApplicationDbContext: IdentityDbContext
    {
        public DbSet<Usuario> Usuarios { get; set; }
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

    }
}
