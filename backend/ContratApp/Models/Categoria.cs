using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ContratApp.Models;

public class Categoria : Entity
{
    [Required]
    public string? Nombre { get; set; }
    [Required]
    public string? Descripcion { get; set; }
    [JsonIgnore]
    public ICollection<Oficio>? Oficios { get; set; }
}
