using AutoMapper;
using EmployeeDirectory.BAL.Interfaces.Providers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeDirectory.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DepartmentController(IProvider<DAL.Models.Department> dept, IMapper mapper) : ControllerBase
    {
        private readonly IProvider<DAL.Models.Department> _dept = dept;
        private readonly IMapper _mapper = mapper;

        [Route("[action]")]
        [HttpGet]
        public async Task<IActionResult> GetDepartments()
        {
            List<DAL.Models.Department> departments = await _dept.GetListAsync();
            List<BAL.DTO.Department> dtos = [];
            foreach (var department in departments)
            {
                dtos.Add(_mapper.Map<BAL.DTO.Department>(department));
            }
            return Ok(dtos);
        }


    }
}
