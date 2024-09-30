using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ContratApp.Models;

public class Speciality : Entity
{
    [Required]
    public string? Name { get; set; }
    [Required]
    public string? Description { get; set; }
    public string? Src { get; set; }

    [Required]
    public int CategoryId { get; set; }
    [JsonIgnore]
    public Category? Category { get; set; }
    public ICollection<UserSpeciality>? UserSpecialities { get; set; }
}
