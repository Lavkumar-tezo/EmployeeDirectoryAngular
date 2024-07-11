using EmployeeDirectory.DAL.Models;

namespace EmployeeDirectory.BAL.Interfaces.Helpers
{
    public interface IEmployeeMapper
    {
        public Employee MapToEmployeeEntity(DTO.Employee dto, Department department, Location location, Role role, Project project, Employee manager, bool isManager);

        public DTO.Employee MapToEmployeeDTO(Employee entity);
    }
}
