using EmployeeDirectory.BAL.DTO;
using EmployeeDirectory.BAL.Exceptions;
using EmployeeDirectory.BAL.Interfaces.Providers;
using EmployeeDirectory.BAL.Interfaces.Validators;
using EmployeeDirectory.DAL.Models;
using System.Data;
using System.Runtime.InteropServices;

namespace EmployeeDirectory.BAL.Validators
{
    public class RoleValidator(IValidator val,IProvider<DAL.Models.Department> dept,IProvider<DAL.Models.Location> loc, IRoleProvider role):IRoleValidator
    {
        private readonly IValidator _validator=val;
        private readonly IProvider<DAL.Models.Department> _dept = dept;
        private readonly IProvider<DAL.Models.Location> _loc = loc;
        private readonly IRoleProvider _role=role;

        private async Task<string> GenerateRoleId()
        {
            List<DAL.Models.Role> roles =await _role.GetRolesAsync();
            if (roles.Count == 0)
            {
                return "TR001";
            }
            string LastRoleId = roles[^1].Id ?? "";
            int lastRoleNumber = int.Parse(LastRoleId[2..]);
            lastRoleNumber++;
            string newId = "TR" + lastRoleNumber.ToString("D3");
            return newId;
        }

        public async Task<DAL.Models.Role> ValidateRoleDTOAsync(DTO.Role dto, [Optional] DAL.Models.Role prevRole)
        {
            
            DAL.Models.Role role= new();
            if (prevRole != null)
            {
                role = prevRole;
            }
            if (!_validator.IsAlphabeticSpace(dto.Name))
            {
                throw new Exception("Role name should have alphabets and space only");
            };
            if(prevRole == null || dto.Name.ToLower()!= prevRole.Name.ToLower())
            {
                List<DAL.Models.Role> roles = await _role.GetRolesAsync();
                if (roles.Any(role => string.Equals(role.Name.ToLower(), dto.Name.ToLower())))
                {
                    throw new Exception("Role Already Exists with given name");
                }
                role.Name = dto.Name;
            }
            role.Departments = [];
            role.Locations = [];
            List<DAL.Models.Department> departments =await _dept.GetListAsync();
            List<DAL.Models.Department> selectedDepartments = new List<DAL.Models.Department>();
            foreach (var dept in dto.DepartmentIds)
            {
                var department = departments.FirstOrDefault(d => string.Equals(d.Id.ToLower(), dept.ToLower()));
                if (department == null)
                {
                    throw new Exception($"Department '{dept}' not found");
                }
                selectedDepartments.Add(department);
            }
            role.Departments= selectedDepartments;
            List<DAL.Models.Location> locations = await _loc.GetListAsync();
            List<DAL.Models.Location> selectedLocations = new List<DAL.Models.Location>();
            foreach (var loc in dto.LocationIds)
            {
                var location = locations.FirstOrDefault(l => string.Equals(l.Id.ToLower(), loc.ToLower()));
                if (location == null)
                {
                    throw new Exception($"Location '{loc}' not found");
                }
                selectedLocations.Add(location);
            }
            role.Locations= selectedLocations;
            if (prevRole == null)
            {
                role.Id = await GenerateRoleId();
            }
            role.Description=dto.Description;
            return role;
        }
    }
}
