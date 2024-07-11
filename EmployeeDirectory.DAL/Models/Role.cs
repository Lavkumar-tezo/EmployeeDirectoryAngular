using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EmployeeDirectory.DAL.Models
{
    [Table("Role")]
    public class Role
    {
        [Key, MaxLength(5), MinLength(5)]
        public string Id { get; set; } = null!;

        [MaxLength(20), MinLength(2), Required]
        public string Name { get; set; }=null!;
        [MaxLength(255)]
        public string? Description { get; set; }

        public virtual ICollection<Department> Departments { get; set; }

        public List<Employee>? Employees { get; set; } 

        public List<Location> Locations { get; set; } 
    }
}
