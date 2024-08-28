namespace ContratApp.Services.Contracts;

public class JobUpdateRequest
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
}
