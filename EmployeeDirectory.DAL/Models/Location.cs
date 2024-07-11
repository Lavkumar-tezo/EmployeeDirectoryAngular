using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EmployeeDirectory.DAL.Models
{
    [Table("Location")]
    public class Location
    {
        [Key, Length(5, 5)]
        public string Id { get; set; } = null!;

        [MaxLength(35), MinLength(2), Required]
        public string Name { get; set; } = null!;

        //public List<Role>? Roles { get; set; } = new List<Role>();
        public virtual ICollection<Role> Roles { get; set; }


        public List<Employee>? Employees { get; set; } = new List<Employee>();
    }
}
