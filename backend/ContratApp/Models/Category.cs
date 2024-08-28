using System.Text.Json.Serialization;

namespace ContratApp.Models;

public class Category : Entity
{
    public string Name { get; set; }
    public string Description { get; set; }
    [JsonIgnore]
    public ICollection<Job> Jobs { get; set; } = new List<Job>();
}
