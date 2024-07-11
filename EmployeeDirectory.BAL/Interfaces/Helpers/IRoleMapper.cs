using EmployeeDirectory.DAL.Models;

namespace EmployeeDirectory.BAL.Interfaces.Helpers
{
    public interface IRoleMapper
    {
        public Role MapToRoleEntity(DTO.Role dto, List<Department> departments, List<Location> locations, string id);

        public DTO.Role MapToRoleDTO(Role entity);
    }
}