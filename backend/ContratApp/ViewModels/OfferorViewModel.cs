using System.ComponentModel.DataAnnotations;

namespace ContratApp.ViewModels
{
    public class OfferorViewModel
    {
        [MaxLength(256)]
        public string? Geolocation { get; set; }
    }
}
