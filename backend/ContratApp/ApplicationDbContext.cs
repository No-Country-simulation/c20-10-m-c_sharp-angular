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

        public DbSet<Category> Categories { get; set; }
        public DbSet<Job> Jobs { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Job>()
                .HasKey(o => o.Id);

            builder.Entity<Category>()
                .HasKey(c => c.Id);

            builder.Entity<Category>()
                .HasMany(a => a.Jobs)
                .WithOne(b => b.Category)
                .HasForeignKey(b => b.CategoryId);

            base.OnModelCreating(builder);
        }
    }
}
