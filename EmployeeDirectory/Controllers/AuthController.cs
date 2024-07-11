using EmployeeDirectory.BAL.Interfaces.Providers;
using EmployeeDirectory.BAL.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EmployeeDirectory.Controllers
{
    [ApiController]
    [Route("/api")]
    public class AuthController(IConfiguration config, IEmployeeProvider employee) : ControllerBase
    {
        private readonly IConfiguration _config = config;
        private readonly IEmployeeProvider _employee=employee;

        [Route("[action]")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody]UserInput input)
        {
            List<DAL.Models.Employee> employees = await _employee.GetEmployeesAsync();
            DAL.Models.Employee? user= employees.FirstOrDefault(emp=>string.Equals(input.Email.ToUpper(),emp.Email.ToUpper()) && string.Equals(input.Password.ToLower(),emp.Password.ToLower()));
            if(user==null)
            {
                return BadRequest("Employee not found");
            }
            var token = GenerateToken(user);
            ValidUser newUser = new ValidUser()
            {
                token=token,
                isManager=(user.IsManager== true) ? true : false,
            };
            return Ok(newUser);
        }

        private string GenerateToken(DAL.Models.Employee emp)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                   new Claim(JwtRegisteredClaimNames.Sub,_config["Jwt:sub"]!),
                   new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                   new Claim("UserId",emp.Id),
                   new Claim("Email",emp.Email),
                   new Claim("IsManager",(bool)emp.IsManager?"True":"False")
            };
            var token = new JwtSecurityToken(
             issuer: config["Jwt:iss"],
             audience: config["Jwt:aud"],
             claims: claims,
             expires: DateTime.Now.AddMinutes(10),
             signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
