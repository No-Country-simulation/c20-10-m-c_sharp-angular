using System.ComponentModel.DataAnnotations;

namespace ContratApp.ViewModels
{
    public class PerfilViewModel
    {
        [Required]
        [MaxLength(256)]
        public string? Nombre { get; set; }
        [Required]
        [MaxLength(256)]
        public string? Apellido { get; set; }
    }
}
