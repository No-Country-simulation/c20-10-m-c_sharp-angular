using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ContratApp.Models;

public class Oficio : Entity
{
    [Required]
    public string? Nombre { get; set; }
    [Required]
    public string? Descripcion { get; set; }
    [Required]
    public int CategoriaId { get; set; }
    [JsonIgnore]
    public Categoria? Categoria { get; set; }
}
