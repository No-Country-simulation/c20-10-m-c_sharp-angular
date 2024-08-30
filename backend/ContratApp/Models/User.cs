using System.ComponentModel.DataAnnotations;

namespace ContratApp.Models
{
    public class User
    {
        [Key]
        [MaxLength(450)]
        public string? Id { get; set; }

        [Required]
        [MaxLength(256)]
        public string? Email { get; set; }
        [Required]
        [MaxLength(256)]
        public string? FirstName { get; set; }
        [Required]
        [MaxLength(256)]
        public string? LastName { get; set; }
    }
}
