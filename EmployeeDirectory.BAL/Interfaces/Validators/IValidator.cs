namespace EmployeeDirectory.BAL.Interfaces.Validators
{
    public interface IValidator
    {
        public bool IsAlphabeticSpace(string input);

        public bool IsFieldEmpty(string value, string key);
    }
}
