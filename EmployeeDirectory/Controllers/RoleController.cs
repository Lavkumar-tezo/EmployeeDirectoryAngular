using AutoMapper;
using EmployeeDirectory.BAL.Interfaces.Providers;
using EmployeeDirectory.BAL.Interfaces.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeDirectory.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RoleController(IRoleProvider role,IRoleValidator val,IMapper mapper) : Controller
    {
        private readonly IRoleProvider _role = role;
        private readonly IRoleValidator _roleValidator=val;
        private readonly IMapper _mapper=mapper;
        
        [Route("[action]")]
        [HttpGet]
        public async Task<IActionResult> GetRoles()
        {
            List<DAL.Models.Role> roles =await _role.GetRolesAsync();
            if (roles.Count == 0)
            {
                return Ok("No Role found");
            }
            List<BAL.DTO.Role> dtoRoles = [];
            foreach (var item in roles)
            {
                dtoRoles.Add(_mapper.Map<BAL.DTO.Role>(item));
            }
            return Ok(dtoRoles);
        }

        [Route("[action]")]
        [HttpGet]
        public async Task<IActionResult> GetRole(string id)
        {
            DAL.Models.Role role = await _role.GetRoleAsync(id);
           BAL.DTO.Role roleDto= _mapper.Map<BAL.DTO.Role>(role);
            return Ok(roleDto);
        }

        [Route("[action]")]
        [HttpGet]
        public async Task<IActionResult> GetRoleByDeptLoc(string locationId,string departmentId)
        {
            List<DAL.Models.Role> roles = await _role.GetRolesAsync();
            if (roles.Count == 0)
            {
                return Ok();
            }
            var filteredRoles = roles
            .Where(role => role.Departments
                .Any(dept => dept.Id.Equals(departmentId, StringComparison.OrdinalIgnoreCase)))
            .ToList();
            filteredRoles = filteredRoles
            .Where(role => role.Locations
                .Any(dept => dept.Id.Equals(locationId, StringComparison.OrdinalIgnoreCase)))
            .ToList();
            List<BAL.DTO.Role> dtoRoles = [];
            foreach (var item in filteredRoles)
            {
                dtoRoles.Add(_mapper.Map<BAL.DTO.Role>(item));
            }
            return Ok(dtoRoles);
        }

        [Route("[action]")]
        [HttpPost]
        public async Task<IActionResult> AddRole([FromBody] BAL.DTO.Role dto)
        {
            if (dto == null)
            {
                return BadRequest("Invalid input data");
            }
            try
            {
                DAL.Models.Role role=await _roleValidator.ValidateRoleDTOAsync(dto);
                await _role.AddRoleAsync(role);
                return Ok("Role Added");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [Route("[action]")]
        [HttpPut]
        public async Task<IActionResult> EditRole([FromBody] BAL.DTO.Role dto)
        {
            if (dto == null)
            {
                return BadRequest("Invalid input data");
            }
            try
            {
                DAL.Models.Role prevRole = await _role.GetRoleAsync(dto.Id);
                DAL.Models.Role editedRole = await _roleValidator.ValidateRoleDTOAsync(dto,prevRole);
                await _role.EditRoleAsync(editedRole);
                return Ok("Role Edited");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("[action]")]
        [HttpDelete]
        public async Task<IActionResult> DeleteRole(string id)
        {
            try
            {
                await _role.DeleteRoleAsync(id);
                return Ok("Role Deleted");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
