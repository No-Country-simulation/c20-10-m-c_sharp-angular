using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ContratApp.Models;

public class Category : Entity
{
    [Required]
    public string? Name { get; set; }
    [Required]
    public string? Description { get; set; }

    public string? Src { get; set; }

    [JsonIgnore]
    public ICollection<Speciality>? Specialities { get; set; }
}
