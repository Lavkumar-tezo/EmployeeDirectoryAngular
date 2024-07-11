using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeDirectory.BAL.DTO
{
    public class Department(string name, string id)
    {
        public string Name { get; set; } = name;
        public string Id { get; set; } = id;
    }
}
