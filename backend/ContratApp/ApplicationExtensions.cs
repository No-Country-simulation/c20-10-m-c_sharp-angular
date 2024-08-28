using ContratApp;
using ContratApp.Services;

public static class ApplicationExtensions
{
    public static void AddCustomConfiguration(this IServiceCollection service)
    {
        service.AddScoped<ICategoryService, CategoryService>();
        service.AddScoped<IJobService, JobService>();

        service.AddAutoMapper(typeof(ApplicationMapper).Assembly);
    }

}
