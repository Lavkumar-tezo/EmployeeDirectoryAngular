
namespace EmployeeDirectory.DAL.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<T> GetAsync(string id);

        Task<List<T>> GetAllAsync();

        Task AddAsync(T entity);

        Task UpdateAsync(T entity);

        Task DeleteAsync(string id);
    }
}
