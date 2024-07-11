using AutoMapper;
using EmployeeDirectory.BAL.DTO;
using EmployeeDirectory.BAL.Interfaces.Providers;
using EmployeeDirectory.DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeDirectory.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProjectController(IProvider<DAL.Models.Project> project, IMapper mapper) : ControllerBase
    {
        private readonly IProvider<DAL.Models.Project> _project =project;
        private readonly IMapper _mapper = mapper;

        [Route("[action]")]
        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            List<DAL.Models.Project> projects = await _project.GetListAsync();
            List<BAL.DTO.Project> dtos = [];
            foreach (var project in projects)
            {
                dtos.Add(_mapper.Map<BAL.DTO.Project>(project));
            }
            return Ok(dtos);
        }
    }
}
