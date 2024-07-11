namespace EmployeeDirectory.BAL.DTO
{
    public class Role
    {
        public string Id { get; set; } = null!;
        public string Name { get; set; }=null!;

        public string[] DepartmentNames { get; set; } = null!;

        public string[] DepartmentIds { get; set; } = null!;

        public string[] LocationNames { get; set; } = null!;

        public string[] LocationIds { get; set; } = null!;

        public string? Description { get; set; }
    }
}
