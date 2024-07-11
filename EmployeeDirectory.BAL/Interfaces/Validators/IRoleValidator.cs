using EmployeeDirectory.DAL.Models;
using System.Runtime.InteropServices;

namespace EmployeeDirectory.BAL.Interfaces.Validators
{
    public interface IRoleValidator
    {
        public Task<Role> ValidateRoleDTOAsync(DTO.Role dto, [Optional] Role role);
    }
}
