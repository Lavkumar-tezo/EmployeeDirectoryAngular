using EmployeeDirectory.BAL.Interfaces.Providers;
using EmployeeDirectory.DAL.Interfaces;
using EmployeeDirectory.DAL.Models;

namespace EmployeeDirectory.BAL.Providers
{
    public class ProjectProvider(IRepository<Project> proj):IProvider<Project>
    {
        private readonly IRepository<Project> _proj = proj;

        public async Task<List<Project>> GetListAsync()
        {
            List<Project> list = await _proj.GetAllAsync();
            return list;
        }

        public async Task<Project> GetById(string id)
        {
            return await _proj.GetAsync(id);
        }

    }
}
