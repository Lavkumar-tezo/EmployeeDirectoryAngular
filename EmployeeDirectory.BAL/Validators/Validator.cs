using System.Text.RegularExpressions;
using EmployeeDirectory.BAL.Extension;
using EmployeeDirectory.BAL.Interfaces.Validators;
namespace EmployeeDirectory.BAL.Validators
{
    public class Validator() :IValidator
    {

        public bool IsAlphabeticSpace(string input)
        {
            Regex regex = new Regex("^[a-zA-Z ]+$");
            return regex.IsMatch(input);
        }


        public bool IsFieldEmpty(string value, string key)
        {
            bool check = value.IsEmpty();
            if (check)
            {
                throw new Exception($"{key} : Required Field can't be null");
            }
            return check;
        }

    }
}
