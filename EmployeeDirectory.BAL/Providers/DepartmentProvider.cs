using EmployeeDirectory.BAL.Interfaces.Providers;
using EmployeeDirectory.DAL.Interfaces;
using EmployeeDirectory.DAL.Models;

public class DepartmentProvider(IRepository<Department> dept) : IProvider<Department>
{
    private readonly IRepository<Department> _dept = dept;

    public async Task<List<Department>> GetListAsync()
    {
        List<Department> deptList = await _dept.GetAllAsync();
        return deptList;
    }

    public async Task<Department> GetById(string id)
    {
        return await _dept.GetAsync(id);
    }

}