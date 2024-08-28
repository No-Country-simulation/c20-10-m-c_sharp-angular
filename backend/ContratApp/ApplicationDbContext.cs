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

        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Oficio> Oficios { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Categoria>()
                .HasMany(a => a.Oficios)
                .WithOne(b => b.Categoria)
                .HasForeignKey(b => b.CategoriaId);

            base.OnModelCreating(builder);
        }
    }
}
