namespace ContratApp.Services.Contracts;

public class JobAddRequest
{
    public string Name { get; set; }
    public string Description { get; set; }
    public Guid CategoryId { get; set; }
}
