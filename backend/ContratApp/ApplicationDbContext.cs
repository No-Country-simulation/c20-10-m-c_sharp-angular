using ContratApp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

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
        public DbSet<OfferorSpeciality> OfferorSpecialities { get; set; }

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
            builder.Entity<OfferorSpeciality>()
                .HasOne(oe => oe.Offeror)
                .WithMany(o => o.OfferorSpecialities)
                .HasForeignKey(oe => oe.IdOfferor);

            builder.Entity<OfferorSpeciality>()
                .HasOne(oe => oe.Speciality)
                .WithMany(e => e.OfferorSpecialities)
                .HasForeignKey(oe => oe.IdSpeciality);

            base.OnModelCreating(builder);
        }
    }
}
