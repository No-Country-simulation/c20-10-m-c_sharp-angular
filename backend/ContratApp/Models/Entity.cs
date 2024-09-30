using System.ComponentModel.DataAnnotations;

namespace ContratApp.Models;

public class Entity
{
    [Key]
    public int Id { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
}
