using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeDirectory.BAL.Exceptions
{
    public class EmpNotFound:Exception
    {
        public EmpNotFound(string message):base(message) { }
    }
}
