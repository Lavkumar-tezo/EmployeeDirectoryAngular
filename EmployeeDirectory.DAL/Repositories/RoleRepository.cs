using EmployeeDirectory.DAL.Interfaces;
using EmployeeDirectory.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeDirectory.DAL.Repositories
{
    public class RoleRepository(AppDbContext context) : Repository<Role>(context),IRoleRepository
    {
        private readonly AppDbContext _context = context;
        public async Task<List<Role>> GetRolesByLocDeptAsync(string locId, string deptId)
        {
            List<Role> roles =await _context.Roles.Where(role=> role.Departments.Any(dept=>string.Equals(dept.Id,deptId)) && role.Locations.Any(loc=> string.Equals(loc.Id,locId))).ToListAsync();
            return roles;
        }

        public async Task<Role> GetAsync(string id)
        {
            Role? role= await _context.Roles.Include(role=> role.Locations).Include(role=> role.Departments).FirstOrDefaultAsync(role => string.Equals(role.Id, id));
            return role;
        }

        public async Task<List<Role>> GetAllAsync()
        {
            List<Role> roles = await _context.Roles.Include(role => role.Locations).Include(role => role.Departments).ToListAsync();
            return roles;
        }
    }
}
