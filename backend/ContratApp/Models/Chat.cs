using System.ComponentModel.DataAnnotations;

namespace ContratApp.Models
{
    public class Chat:Entity
    {
        [MaxLength(450)]
        [Required]
        public string? IdUser { get; set; }
        public User? User { get; set; }

        [MaxLength(450)]
        [Required]
        public string? IdOtherUser { get; set; }
        public User? OtherUser { get; set; }

        public string? Image { get; set; }

        public ICollection<Message>? Messages { get; set; }
    }
}
