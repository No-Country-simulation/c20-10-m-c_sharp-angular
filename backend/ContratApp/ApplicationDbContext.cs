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
        public DbSet<Category> Categories { get; set; }
        public DbSet<Speciality> Specialities { get; set; }
        public DbSet<UserSpeciality> UserSpecialities { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Category>()
                .HasMany(a => a.Specialities)
                .WithOne(b => b.Category)
                .HasForeignKey(b => b.CategoryId);
            builder.Entity<UserSpeciality>()
                .HasOne(ue => ue.User)
                .WithMany(u => u.UserSpecialities)
                .HasForeignKey(oe => oe.IdUser);
            builder.Entity<UserSpeciality>()
                .HasOne(oe => oe.Speciality)
                .WithMany(e => e.UserSpecialities)
                .HasForeignKey(oe => oe.IdSpeciality);
            builder.Entity<Chat>()
                .HasMany(a => a.Messages)
                .WithOne(b => b.Chat)
                .HasForeignKey(b => b.IdChat);

            base.OnModelCreating(builder);
        }
    }
}
