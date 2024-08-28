using AutoMapper;
using ContratApp.Models;
using ContratApp.ViewModels;

namespace ContratApp;

public class ApplicationMapper : Profile
{
    public ApplicationMapper()
    {
        CreateMap<CategoriaAddViewModel, Categoria>();
        CreateMap<CategoriaUpdateViewModel, Categoria>();

        CreateMap<OficioAddViewModel, Oficio>();
        CreateMap<OficioUpdateViewModel, Oficio>();
    }
}
