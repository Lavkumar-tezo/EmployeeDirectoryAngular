using AutoMapper;
using EmployeeDirectory.BAL.DTO;
using EmployeeDirectory.BAL.Interfaces.Helpers;
using EmployeeDirectory.BAL.Interfaces.Providers;
using EmployeeDirectory.BAL.Interfaces.Validators;
using EmployeeDirectory.DAL.Interfaces;
using EmployeeDirectory.DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeDirectory.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeController(IEmployeeProvider employee,IEmployeeValidator validator,IMapper mapper) : ControllerBase
    {
        private readonly IEmployeeProvider _employee = employee;
        private readonly IEmployeeValidator _employeeValidator=validator;
        private readonly IMapper _mapper=mapper;

        [Route("[action]")]
        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            List<DAL.Models.Employee> employees =await _employee.GetEmployeesAsync();
            if (employees.Count == 0)
            {
                return Ok("No Employee found");
            }
            List<BAL.DTO.Employee> dtos = [];
            foreach (var employee in employees)
            {
                dtos.Add(_mapper.Map<BAL.DTO.Employee>(employee));
            }
            return Ok(dtos);
        }

        [Route("[action]")]
        [HttpGet]
        public async Task<IActionResult> GetEmployee(string id)
        {
            try
            {
                DAL.Models.Employee entityEmployee =await _employee.GetEmployeeByIdAsync(id);
                BAL.DTO.Employee emp = _mapper.Map<BAL.DTO.Employee>(entityEmployee);
                return Ok(emp);
            }
            catch(Exception ex)
            {
                return NotFound(ex.Message);
            }                       
        }

        [Route("[action]")]
        [HttpGet]
        public async Task<IActionResult> GetEmployeesByRoleId(string id)
        {
            try
            {
                List<DAL.Models.Employee> entityEmployee = await _employee.GetEmployeeByRoleAsync(id);
                List<BAL.DTO.Employee> dtos = [];
                foreach (var employee in entityEmployee)
                {
                    dtos.Add(_mapper.Map<BAL.DTO.Employee>(employee));
                }
                return Ok(dtos);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [Route("[action]")]
        [HttpGet]
        public async Task<IActionResult> GetEmployeesProfileByRoleId(string id)
        {
            try
            {
                List<DAL.Models.Employee> entityEmployee = await _employee.GetEmployeeByRoleAsync(id);
                List<EmployeeIdProfile> dtos = [];
                foreach (var employee in entityEmployee)
                {
                    dtos.Add(_mapper.Map<EmployeeIdProfile>(employee));
                }
                return Ok(dtos);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }




        [Route("[action]")]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] BAL.DTO.Employee dto)
        {
            if (dto == null)
            {
                return BadRequest("Invalid input data");
            }
            try
            {
                DAL.Models.Employee emp=await _employeeValidator.ValidateEmployeeDTOAsync(dto);
                await _employee.AddEmployeeAsync(emp);
                return Ok("Employee added");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [Route("[action]")]
        [HttpGet]
        public async Task<IActionResult> GetManagers()
        {
            List<DAL.Models.Employee> employees = await _employee.GetManagersAsync();
            if (employees.Count == 0)
            {
                return Ok("No Employee found");
            }
            List<BAL.DTO.Employee> dtoRoles = [];
            foreach (var employee in employees)
            {
                dtoRoles.Add(_mapper.Map<BAL.DTO.Employee>(employee));
            }
            return Ok(dtoRoles);
        }

        [Route("[action]")]
        [HttpPut]
        public async Task<IActionResult> Update([FromBody] BAL.DTO.Employee dto)
        {
            if (dto == null)
            {
                return BadRequest("Invalid input data");
            }
            try
            {
                DAL.Models.Employee? selectedEmp = await _employee.GetEmployeeByIdAsync(dto.Id);
                DAL.Models.Employee emp =await _employeeValidator.ValidateEmployeeDTOAsync(dto,selectedEmp);
                await _employee.UpdateEmployeeAsync(emp);
                return Ok("Employee Updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [Route("[action]")]
        [HttpPut]
        public async Task<IActionResult> UpdateStatus(string id)
        {
            try
            {
                DAL.Models.Employee? selectedEmp = await _employee.GetEmployeeByIdAsync(id);
                await _employee.ToggleStatusAsync(id);
                return Ok("Employee Updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("[action]")]
        [HttpDelete]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                await _employee.DeleteEmployeeAsync(id);
                return Ok("Employee Deleted");
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [Route("[action]")]
        [HttpDelete]
        public async Task<IActionResult> DeleteSelectedEmployee(List<string> ids)
        {
            try
            {
                await _employee.DeleteSelectedEmployees(ids);
                return Ok("Employees Deleted");
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
