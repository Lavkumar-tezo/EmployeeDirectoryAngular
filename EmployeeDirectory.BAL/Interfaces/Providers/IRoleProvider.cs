using EmployeeDirectory.DAL.Models;
namespace EmployeeDirectory.BAL.Interfaces.Providers
{
    public interface IRoleProvider
    {
        public Task AddRoleAsync(Role role);

        public Task<List<Role>> GetRolesAsync();

        public Task<Role> GetRoleAsync(string id);

        public Task EditRoleAsync(Role role);

        public Task DeleteRoleAsync(string id);


    }
}
