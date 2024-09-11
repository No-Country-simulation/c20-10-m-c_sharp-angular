using System.ComponentModel.DataAnnotations;

namespace ContratApp.Models
{
    public class UserSpeciality : Entity
    {
        [MaxLength(450)]
        [Required]
        public string? IdUser { get; set; }
        public User? User { get; set; }

        [Required]
        public int IdSpeciality { get; set; }
        public Speciality? Speciality { get; set; }

        [Required]
        [MaxLength(100)]
        public string? Title { get; set; }

        [Required]
        [MaxLength(256)]
        public string? Text { get; set; }

        [MaxLength(50)]
        public string? Area { get; set; }
    }
}
