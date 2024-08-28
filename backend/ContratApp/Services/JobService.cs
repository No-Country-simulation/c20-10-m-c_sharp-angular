using AutoMapper;
using ContratApp.Models;
using ContratApp.Services.Contracts;
using Microsoft.EntityFrameworkCore;

namespace ContratApp.Services;

public interface IJobService
{
    Task<IEnumerable<Job>> GetAllAsync();
    Task<Job> GetByIdAsync(Guid id);
    Task<Job> CreateAsync(JobAddRequest job);
    Task<Job> UpdateAsync(JobUpdateRequest job);
    Task<bool> DeleteAsync(Guid id);
}

public class JobService : IJobService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    public JobService(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<Job> CreateAsync(JobAddRequest job)
    {
        var newJob = await _context.Jobs.AddAsync(_mapper.Map<Job>(job));
        var category = await _context.Categories.FindAsync(job.CategoryId);
        if (category == null)
            throw new ArgumentException("Category not found");
        await _context.SaveChangesAsync();
        return newJob.Entity;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var job = await _context.Jobs.FindAsync(id);
        if (job is null) return false;
        job.IsActive = false;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Job>> GetAllAsync()
    {
        return await _context.Jobs.Where(c => c.IsActive).ToListAsync();
    }

    public async Task<Job> GetByIdAsync(Guid id)
    {
        return await _context.Jobs.FindAsync(id);
    }

    public async Task<Job> UpdateAsync(JobUpdateRequest job)
    {
        var updatedJob = _context.Jobs.Update(_mapper.Map<Job>(job));
        await _context.SaveChangesAsync();
        return updatedJob.Entity;
    }
}
