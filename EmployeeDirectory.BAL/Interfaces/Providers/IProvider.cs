namespace EmployeeDirectory.BAL.Interfaces.Providers
{
    public interface IProvider<T>
    {
        public Task<List<T>> GetListAsync();

        public Task<T> GetById(string id);
    }
}
