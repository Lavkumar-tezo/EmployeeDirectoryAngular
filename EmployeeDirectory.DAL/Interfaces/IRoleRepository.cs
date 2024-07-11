using EmployeeDirectory.DAL.Models;

namespace EmployeeDirectory.DAL.Interfaces
{
    public interface IRoleRepository:IRepository<Role>
    {
        public Task<List<Role>> GetRolesByLocDeptAsync(string locId,string deptId);


    }
}
