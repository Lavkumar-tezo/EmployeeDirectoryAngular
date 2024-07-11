namespace EmployeeDirectory.BAL.DTO
{
    public class Employee
    {
        public string Id { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string LocationName { get; set; } = null!;

        public string LocationId { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string JoiningDate { get; set; }=null!;

        public string DepartmentName { get; set; }=null!;

        public string DepartmentId { get; set; } = null!;

        public string RoleName { get; set; } = null!;

        public string RoleId { get; set; } = null!;

        public string? ProjectName { get; set; }

        public string? ProjectId { get; set; }

        public string? Mobile { get; set; }

        public string? DOB { get; set; }

        public string? Manager { get; set; }

        public string Status { get; set; } = null!;

        public string? Profile {  get; set; }
    }
}
