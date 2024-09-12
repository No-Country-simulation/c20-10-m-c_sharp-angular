using Microsoft.Extensions.Configuration.UserSecrets;
using System.ComponentModel.DataAnnotations;

namespace ContratApp.ViewModels
{
    public class MessageAddViewModel
    {
        [Required]
        [MaxLength(1024)]
        public string Message { get; set; }

        public DateTime? createdAt { get; set; }

        [MaxLength(450)]
        public string? userId { get; set; }
    }
}
