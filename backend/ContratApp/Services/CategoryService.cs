using AutoMapper;
using ContratApp.Models;
using ContratApp.Services.Contracts;
using Microsoft.EntityFrameworkCore;

namespace ContratApp.Services;

public interface ICategoryService
{
    Task<IEnumerable<Category>> GetAllAsync();
    Task<Category> GetByIdAsync(Guid id);
    Task<Category> CreateAsync(CategoryAddRequest category);
    Task<Category> UpdateAsync(CategoryUpdateRequest category);
    Task<bool> DeleteAsync(Guid id);
}

public class CategoryService : ICategoryService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    public CategoryService(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<Category> CreateAsync(CategoryAddRequest category)
    {
        var newCategory = await _context.Categories.AddAsync(_mapper.Map<Category>(category));
        await _context.SaveChangesAsync();
        return newCategory.Entity;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category is null) return false;
        category.IsActive = false;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Category>> GetAllAsync()
    {
        return await _context.Categories.Where(c => c.IsActive).ToListAsync();
    }

    public async Task<Category> GetByIdAsync(Guid id)
    {
        return await _context.Categories.FindAsync(id);
    }

    public async Task<Category> UpdateAsync(CategoryUpdateRequest category)
    {
        var updatedCategory = _context.Categories.Update(_mapper.Map<Category>(category));
        await _context.SaveChangesAsync();
        return updatedCategory.Entity;
    }
}
