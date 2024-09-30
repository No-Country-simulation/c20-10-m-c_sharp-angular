using AutoMapper;
using ContratApp.Models;
using ContratApp.ViewModels;

namespace ContratApp;

public class ApplicationMapper : Profile
{
    public ApplicationMapper()
    {
        CreateMap<CategoryAddViewModel, Category>();
        CreateMap<CategoryUpdateViewModel, Category>();

        CreateMap<SpecialityAddViewModel, Speciality>();
        CreateMap<SpecialityUpdateViewModel, Speciality>();

        CreateMap<UserSpecialityAddVM, UserSpeciality>();
    }
}
