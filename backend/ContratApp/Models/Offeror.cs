using ContratApp.Migrations;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ContratApp.Models
{
    public class Offeror
    {
        [Key]
        [MaxLength(450)]
        public string? Id { get; set; }

        [MaxLength(256)]
        public string? Geolocation { get; set; }

        [JsonIgnore]
        public User? User { get; set; }

        public ICollection<OfferorSpeciality>? OfferorSpecialities { get; set; }
    }
}
