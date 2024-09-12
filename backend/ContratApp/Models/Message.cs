using System.ComponentModel.DataAnnotations;

namespace ContratApp.Models
{
    public class Message:Entity
    {
        [Required]
        public int IdChat { get; set; }
        public Chat? Chat { get; set; }

        [MaxLength(1024)]
        [Required]
        public string? Text { get; set; }

        [MaxLength(450)]
        [Required]
        public string? UserId { get; set; }


    }
}
