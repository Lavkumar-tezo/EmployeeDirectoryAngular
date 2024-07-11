using Employee = EmployeeDirectory.DAL.Models.Employee;
namespace EmployeeDirectory.BAL.Interfaces.Providers
{
    public interface IEmployeeProvider
    {
        public Task AddEmployeeAsync(Employee employee);

        public Task<List<Employee>> GetEmployeesAsync();

        public Task<List<Employee>> GetManagersAsync();

        public Task<Employee> GetEmployeeByIdAsync(string id);

        public Task UpdateEmployeeAsync(Employee emp);

        public Task DeleteEmployeeAsync(string id);

        public Task DeleteSelectedEmployees(List<string> ids);

        public Task ToggleStatusAsync(string id);

        public Task<List<Employee>> GetEmployeeByRoleAsync(string id);
    }
}
