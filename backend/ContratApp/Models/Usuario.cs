using System.ComponentModel.DataAnnotations;

namespace ContratApp.Models
{
    public class Usuario
    {
        [Key]
        [MaxLength(450)]
        public string? Id { get; set; }

        [Required]
        [MaxLength(256)]
        public string? Email { get; set; }
        [Required]
        [MaxLength(256)]
        public string? Name { get; set; }
        [Required]
        [MaxLength(256)]
        public string? Apellido { get; set; }
    }
}
