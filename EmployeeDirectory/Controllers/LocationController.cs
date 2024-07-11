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
    public class LocationController(IProvider<DAL.Models.Location> loc, IMapper mapper) : ControllerBase
    {
        private readonly IProvider<DAL.Models.Location> _loc = loc;
        private readonly IMapper _mapper = mapper;

        [Route("[action]")]
        [HttpGet]
        public async Task<IActionResult> GetLocations()
        {
            List<DAL.Models.Location> locations = await _loc.GetListAsync();
            List<BAL.DTO.Location> dtos = [];
            foreach (var location in locations)
            {
                dtos.Add(_mapper.Map<BAL.DTO.Location>(location));
            }
            return Ok(dtos);
        }
    }
}
