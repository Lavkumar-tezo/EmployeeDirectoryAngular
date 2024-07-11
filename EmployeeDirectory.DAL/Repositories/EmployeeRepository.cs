using EmployeeDirectory.DAL.Interfaces;
using EmployeeDirectory.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeDirectory.DAL.Repositories
{
    public class EmployeeRepository(AppDbContext context) : Repository<Employee>(context),IEmployeeRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<List<Employee>> GetEmployeesByRoleAsync(string roleId)
        {
            List<Employee> employees = await _context.Employees.Where(emp => string.Equals(emp.RoleId, roleId)).Include(emp=> emp.Role).Include(emp=> emp.Department).Include(emp=> emp.Project).Include(emp=> emp.Location).ToListAsync();
            return employees;
        }

        public new async Task DeleteAsync(string id)
        {
            Employee? emp=await _context.Employees.FirstOrDefaultAsync(emp=> string.Equals(emp.Id,id));
            if(emp != null)
            {
                emp.IsDeleted = true;
                await _context.SaveChangesAsync();
            }
        }

        public new async Task<Employee> GetAsync(string id)
        {
            Employee? emp = await _context.Employees.Include(emp => emp.Role).Include(emp => emp.Department).Include(emp => emp.Project).Include(emp => emp.Location).FirstOrDefaultAsync(emp => string.Equals(emp.Id, id));
            return emp;
        }

        public new async Task<List<Employee>> GetAllAsync()
        {
            List<Employee> employees= await _context.Employees.Where(emp => emp.IsDeleted==false).Include(emp => emp.Role).Include(emp => emp.Department).Include(emp => emp.Project).Include(emp => emp.Location).ToListAsync();
            return employees;
        }

        public async Task DeleteBulkEmployee(List<string> ids)
        {
            List<Employee> employees= await _context.Employees.Where(emp => ids.Contains(emp.Id)).ToListAsync();
            foreach(var emp in employees)
            {
                emp.IsDeleted = true;
            }
            await _context.SaveChangesAsync();
        }

        public async Task ToggleStatusAsync(string id)
        {
            id = id.ToUpper();
            Employee? emp= await _context.Employees.FirstOrDefaultAsync(emp=> string.Equals(emp.Id, id));
            if(emp != null)
            {
                emp.Status = !emp.Status;
            }
            await _context.SaveChangesAsync();
        }
    }
}
