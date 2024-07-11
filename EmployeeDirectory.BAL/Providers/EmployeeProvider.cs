using Employee = EmployeeDirectory.DAL.Models.Employee;
using EmployeeDirectory.DAL.Interfaces;
using EmployeeDirectory.BAL.Interfaces.Providers;
using EmployeeDirectory.BAL.Exceptions;

namespace EmployeeDirectory.BAL.Providers
{
    public class EmployeeProvider(IEmployeeRepository employee): IEmployeeProvider
    {
        private readonly IEmployeeRepository _employee = employee;
        public async Task AddEmployeeAsync(Employee employee)
        {
           await _employee.AddAsync(employee);
        }

        public async Task<List<Employee>> GetEmployeesAsync()
        {
            List<Employee> employees= await _employee.GetAllAsync();
           return employees;
        }

        public async Task<List<Employee>> GetManagersAsync()
        {
            List<Employee> employees = await _employee.GetAllAsync();
            employees = employees.Where(x=> x.IsManager==true).ToList();
            return employees;
        }

        public async Task<Employee> GetEmployeeByIdAsync(string id)
        {
            id = id.ToUpper();
            Employee emp =await _employee.GetAsync(id) ?? throw new EmpNotFound($"Employee with ID {id} not found.");
            SelectedEmployee.Id = emp.Id;
            SelectedEmployee.DeptName = emp.Department.Name;
            SelectedEmployee.LocName = emp.Location.Name;
            SelectedEmployee.RoleName = emp.Role.Name;
            return emp;

        }

        public async Task<List<Employee>> GetEmployeeByRoleAsync(string id)
        {
            List<Employee> employees=await _employee.GetEmployeesByRoleAsync(id);
            return employees;
        }

        public async Task UpdateEmployeeAsync(Employee emp)
        {
           await _employee.UpdateAsync(emp);

        }

        public async Task ToggleStatusAsync(string id)
        {
            await _employee.ToggleStatusAsync(id);
        } 

        public async Task DeleteEmployeeAsync(string id)
        {
           await _employee.DeleteAsync(id);

        }

        public async Task DeleteSelectedEmployees(List<string> ids)
        {
            await _employee.DeleteBulkEmployee(ids);
        }

    }
}
