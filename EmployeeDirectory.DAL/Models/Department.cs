using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeDirectory.DAL.Models
{
    [Table("Department")]
    public class Department
    {
        [Key,Length(5,5)]
        public string Id { get; set; } = null!;

        [MaxLength(35), MinLength(2), Required]
        public string Name { get; set; } = null!;

        public virtual ICollection<Role> Roles { get; set; }

        public virtual ICollection<Employee>? Employees { get; set; }
    }
}
