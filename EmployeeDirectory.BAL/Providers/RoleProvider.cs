using EmployeeDirectory.DAL.Models;
using EmployeeDirectory.DAL.Interfaces;
using EmployeeDirectory.BAL.Interfaces.Providers;

namespace EmployeeDirectory.BAL.Providers
{
    public class RoleProvider(IRoleRepository data):IRoleProvider
    {
        private readonly IRoleRepository _role = data;

        public async Task AddRoleAsync(Role role)
        {
            await _role.AddAsync(role);
        }

        public async Task<string> GenerateRoleIdAsync()
        {
            List<Role> roles =await _role.GetAllAsync();
            if (roles.Count == 0)
            {
                return "IN001";
            }
            string LastRoleId = roles[^1].Id ?? "";
            int lastRoleNumber = int.Parse(LastRoleId[2..]);
            lastRoleNumber++;
            string newId = "IN" + lastRoleNumber.ToString("D3");
            return newId;
        }

        public async Task<List<Role>> GetRolesAsync()
        {
            List<Role> roles= await _role.GetAllAsync();
            return roles;
        }

        public async Task<Role> GetRoleAsync(string id)
        {
            Role role=await _role.GetAsync(id);
            return role;
        }

        public async Task EditRoleAsync(Role role)
        {
            await _role.UpdateAsync(role);
        }

        public async Task DeleteRoleAsync(string id)
        {
            await _role.DeleteAsync(id);
        }

    }
}
