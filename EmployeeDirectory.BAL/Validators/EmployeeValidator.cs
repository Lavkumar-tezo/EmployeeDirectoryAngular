using EmployeeDirectory.BAL.Exceptions;
using EmployeeDirectory.BAL.Extension;
using EmployeeDirectory.BAL.Interfaces.Providers;
using EmployeeDirectory.BAL.Interfaces.Validators;
using EmployeeDirectory.DAL.Models;
using System.Globalization;
using System.Net.Mail;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;

namespace EmployeeDirectory.BAL.Validators
{
    public class EmployeeValidator(IValidator val,IEmployeeProvider emp,IRoleProvider role,IProvider<Department> dept,IProvider<Location> loc,IProvider<Project> proj):IEmployeeValidator
    {
        private readonly IValidator _val = val;
        private readonly IEmployeeProvider _employee = emp;
        private readonly IRoleProvider _role = role;
        private readonly IProvider<Department> _dept = dept;
        private readonly IProvider<Location> _loc = loc;
        private readonly IProvider<Project> _proj = proj;

        //private DTO.Employee StorePreviousValues(DTO.Employee dto,Employee emp)
        //{
        //    dto.FirstName=(string.Equals(dto.FirstName,"string"))? emp.FirstName:dto.FirstName;
        //    dto.LastName = (string.Equals(dto.LastName, "string")) ? emp.LastName : dto.LastName;
        //    dto.Email = (string.Equals(dto.Email, "string")) ? emp.Email : dto.Email;
        //    dto.Role = (string.Equals(dto.Role, "string")) ? emp.Role.Name : dto.Role;
        //    dto.Department = (string.Equals(dto.Department, "string")) ? emp.Department.Name : dto.Department;
        //    dto.Location=(string.Equals(dto.Location, "string")) ? emp.Location.Name : dto.Location;
        //    dto.Project=(string.Equals(dto.Project, "string")) ? emp.Project?.Name : dto.Project;
        //    dto.Manager=(string.Equals(dto.Manager, "string")) ?emp.Manager?.Id: dto.Manager;
        //    dto.Mobile=(string.Equals(dto.Mobile, "string")) ?emp.Mobile:dto.Mobile;
        //    dto.JoiningDate = (string.Equals(dto.JoiningDate, "string")) ? emp.JoiningDate.Date.ToString("MM/dd/yyyy") : dto.JoiningDate;
        //    dto.DOB = (string.Equals(dto.DOB, "string") && emp.DOB.HasValue) ? IsValidDateFormat(emp.DOB.Value.ToString("MM/dd/yyyy"), "DOB").ToString("MM/dd/yyyy") : dto.DOB;
        //    return dto;
        //}

        private bool ValidateEmail(string key,string value)
        {
            if (!_val.IsFieldEmpty(value, key))
            {
                _ = new MailAddress(value);
            }
            return true;
        }

        private bool ValidatePhone(string input)
        {
            if (input.IsEmpty())
            {
                return true;
            }
            else if (input.Length != 10 || !input.All(char.IsDigit))
            {
                string message = input.Length != 10 ? "Mobile number should be of 10 digits" : "Mobile number should contain digits only";
                throw new Exception(message);
            }
            return true;
        }

        private DateTime IsValidDateFormat(string value, string key)
        {
            if (DateTime.TryParseExact(value, "MM/dd/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime result))
            {
                return result;
            }
            else
            {
                throw new Exception($"{key} : Date is not in mm/dd/yyyy format");
            }
        }

        private DateTime ValidateJoinDate(string value, string key)
        {
            _val.IsFieldEmpty(value, key);
            return IsValidDateFormat(value, key);

        }

        private void ValidateDOB(string value, Employee emp)
        {
            if(!value.IsEmpty())
            {
                emp.DOB=IsValidDateFormat(value, "DOB");
            }
        }

        private async Task ValidateManager(string value,Employee emp)
        {
            if (value.IsEmpty())
            {
                return;
            }
            value = value.ToUpper();
            if (!Regex.IsMatch(value, @"^TZ\d{4}$"))
            {
                throw new Exception("Manager id should be in TZXXXX Format");
            }
            List<Employee> employees = await _employee.GetManagersAsync();
            Employee? Manager= employees.FirstOrDefault(emp => emp.Id.ToUpper().Equals(value));
            if (Manager !=null)
            {
                emp.Manager = Manager;
                emp.ManagerId= Manager.Id;
                return;
            }
            throw new Exception("Selected manager ID not found");
        }

        private async Task IsValidCombination(DTO.Employee dto, Employee emp) // checking role,dept and location combination exists or not
        {
            List<Department> departments =await _dept
                .GetListAsync();
            List<Location> locations = await _loc
                .GetListAsync();
            List<Role> roles = await _role.GetRolesAsync();
            Department? selectedDepartment = departments.FirstOrDefault(dept=>string.Equals(dept.Id.ToLower(),dto.DepartmentId.ToLower())) ?? throw new Exception("Selected Department not found");
            Location? selectedLocation = locations.FirstOrDefault(loc => string.Equals(loc.Id.ToLower(), dto.LocationId.ToLower())) ?? throw new Exception("Selected Location not found");
            Role? selectedRole = roles.FirstOrDefault(role => string.Equals(role.Id.ToLower(), dto.RoleId.ToLower())) ?? throw new Exception("Selected Role not found");
            bool isDeptContainRole = (selectedDepartment.Roles != null) && selectedDepartment.Roles.Any(role => role.Id == selectedRole.Id);
            bool isLocContainRole = (selectedLocation.Roles != null) && selectedLocation.Roles.Any(role => role.Id == selectedRole.Id);
            if (isDeptContainRole && isLocContainRole)
            {
                emp.Role = selectedRole;
                emp.RoleId= selectedRole.Id;
                emp.Department = selectedDepartment;
                emp.DepartmentId= selectedDepartment.Id;
                emp.Location = selectedLocation;
                emp.LocationId= selectedLocation.Id;
                return;
            }
            throw new Exception("Selected Role,Department,Location Combination not found");
        }

        public async Task<Employee> ValidateEmployeeDTOAsync(DTO.Employee dto,[Optional]Employee? employee)
        {
            Employee emp=new();
            if (employee!=null)
            {
                emp = employee;
                //dto= StorePreviousValues(dto,employee);
                emp.Status = string.Equals(dto.Status, "active", StringComparison.OrdinalIgnoreCase) ? true : false;
            }
            else
            {
                try
                {
                    var employees =await _employee.GetEmployeeByIdAsync(dto.Id);
                    if (employees != null)
                    {
                        throw new Exception("Id is already present");
                    }
                    
                }
                catch (EmpNotFound ex)
                {
                    emp.Id = dto.Id;
                    emp.Status = true;
                    emp.IsDeleted = false;
                    emp.IsManager = true;
                    emp.Password = "1234567890";
                    emp.Profile = dto.Profile;
                }
                catch (Exception)
                {
                    throw;
                }
            }
            emp.FirstName=(_val.IsFieldEmpty("FirstName",dto.FirstName))? "":dto.FirstName;
            emp.LastName=(_val.IsFieldEmpty("LastName", dto.LastName))?"":dto.LastName;
            emp.Email=(ValidateEmail("Email", dto.Email))?dto.Email:"";
            emp.Mobile = (ValidatePhone(dto.Mobile ?? "")) ? dto.Mobile : "";
            emp.JoiningDate=ValidateJoinDate(dto.JoiningDate.ToString(),"JoinDate");
            ValidateDOB(dto.DOB??"", emp);           
            await ValidateManager(dto.Manager??"",emp);
            await IsValidCombination(dto,emp);
            if (!dto.ProjectId.IsEmpty())
            {
                Project? project=await _proj.GetById(dto.ProjectId) ?? throw new Exception("Selected Project not found");
                emp.Project=project;
                emp.ProjectId=project.Id;
            }
            return emp;
        }
    }
}
