using System.Text.Json.Serialization;

namespace ContratApp.Models;

public class Job : Entity
{
    public string Name { get; set; }
    public string Description { get; set; }
    public Guid CategoryId { get; set; }
    [JsonIgnore]
    public Category Category { get; set; }
}
