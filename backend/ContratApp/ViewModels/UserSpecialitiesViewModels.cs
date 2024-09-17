using ContratApp.Models;
using System.ComponentModel.DataAnnotations;

namespace ContratApp.ViewModels
{
    public class UserSpecialitiesSearchViewModel
    {
        public string? Criteria { get; set; }
        public int? IdCategory { get; set; }
        public int? IdSpeciality { get; set; }
    }

    public class UserSpecialityAddVM
    {
        [MaxLength(450)]
        [Required]
        public string? IdUser { get; set; }
        
        [Required]
        public int IdSpeciality { get; set; }

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
