using ContratApp.Migrations;
using System.ComponentModel.DataAnnotations;

namespace ContratApp.Models
{
    public class Offeror
    {
        [Key]
        [MaxLength(450)]
        public string? Id { get; set; }

        [MaxLength(256)]
        public string? Geolocation { get; set; }

        public User? User { get; set; }
    }
}
