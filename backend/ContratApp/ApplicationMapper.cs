using AutoMapper;
using ContratApp.Models;
using ContratApp.Services.Contracts;

namespace ContratApp;

public class ApplicationMapper : Profile
{
    public ApplicationMapper()
    {
        CreateMap<CategoryAddRequest, Category>();
        CreateMap<CategoryUpdateRequest, Category>();

        CreateMap<JobAddRequest, Job>();
        CreateMap<JobUpdateRequest, Job>();
    }
}
