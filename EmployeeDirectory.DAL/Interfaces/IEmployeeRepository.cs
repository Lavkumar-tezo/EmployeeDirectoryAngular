using EmployeeDirectory.DAL.Models;

namespace EmployeeDirectory.DAL.Interfaces
{
    public interface IEmployeeRepository:IRepository<Employee>
    {
        public Task<List<Employee>> GetEmployeesByRoleAsync(string roleId);

        public Task DeleteBulkEmployee(List<string> ids);

        public Task ToggleStatusAsync(string id);
    }
}
