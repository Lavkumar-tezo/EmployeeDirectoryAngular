using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeDirectory.BAL.DTO
{
    public class UserInput
    {
        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;
    }
}
