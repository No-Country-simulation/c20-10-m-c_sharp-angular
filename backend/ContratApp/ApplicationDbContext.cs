using ContratApp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ContratApp
{
    public class ApplicationDbContext: IdentityDbContext
    {
        public DbSet<User> Users { get; set; }
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Speciality> Specialities { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Category>()
                .HasMany(a => a.Specialities)
                .WithOne(b => b.Category)
                .HasForeignKey(b => b.CategoryId);

            base.OnModelCreating(builder);
        }
    }
}
