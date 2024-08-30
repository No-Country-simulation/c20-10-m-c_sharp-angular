using System.ComponentModel.DataAnnotations;

namespace ContratApp.ViewModels
{
    public class ProfileViewModel
    {
        [Required]
        [MaxLength(256)]
        public string? FirstName { get; set; }
        [Required]
        [MaxLength(256)]
        public string? LastName { get; set; }
    }
}
