using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EmployeeDirectory.DAL.Models
{
    [Table("Project")]
    public class Project
    {
        [Key, Length(5, 5)]
        public string Id { get; set; } = null!;

        [MaxLength(35), MinLength(2), Required]
        public string Name { get; set; } = null!;

        public List<Employee> Employees { get; set; } = new List<Employee>();
    }
}
