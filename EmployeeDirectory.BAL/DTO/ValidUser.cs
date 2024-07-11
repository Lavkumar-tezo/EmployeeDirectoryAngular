
namespace EmployeeDirectory.BAL.DTO
{
    public class ValidUser
    {
        public string token { get; set; } = null!;

        public bool isManager { get; set; }=false;
    }
}
