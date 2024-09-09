using ContratApp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ContratApp
{
    public class ApplicationDbContext: IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Offeror> Offerors { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Speciality> Specialities { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Offeror>()
                .HasOne(o => o.User)
                .WithOne(u => u.Offeror)
                .HasForeignKey<Offeror>(o => o.Id);
            builder.Entity<Category>()
                .HasMany(a => a.Specialities)
                .WithOne(b => b.Category)
                .HasForeignKey(b => b.CategoryId);

            base.OnModelCreating(builder);
        }
    }
}
