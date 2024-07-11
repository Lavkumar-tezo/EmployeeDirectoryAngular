using EmployeeDirectory.BAL.Interfaces.Providers;
using EmployeeDirectory.DAL.Interfaces;
using EmployeeDirectory.DAL.Models;

namespace EmployeeDirectory.BAL.Providers
{
    public class LocationProvider(IRepository<Location> loc):IProvider<Location>
    {
        private readonly IRepository<Location> _loc = loc;

        public async Task<List<Location>> GetListAsync()
        {
            List<Location> list =await _loc.GetAllAsync();
            return list;
        }

        public async Task<Location> GetById(string id)
        {
            return await _loc.GetAsync(id);
        }

    }
}
