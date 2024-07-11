using AutoMapper;
using EmployeeDirectory.BAL.DTO;
using EmployeeDirectory.BAL.Interfaces.Providers;
using EmployeeDirectory.DAL.Interfaces;
using EmployeeDirectory.DAL.Models;
using Location = EmployeeDirectory.BAL.DTO.Location;
namespace EmployeeDirectory.BAL.Helper
{
    public class ModelMapper:Profile
    {
        public ModelMapper()
        {
            CreateMap<DAL.Models.Role, DTO.Role>().
                ForMember(dest => dest.DepartmentNames, act => act.MapFrom(src => src.Departments.Select(dept => dept.Name).ToArray())).
                ForMember(dest => dest.LocationNames, act => act.MapFrom(src => src.Locations.Select(loc => loc.Name).ToArray())).
                ForMember(dest => dest.DepartmentIds, act => act.MapFrom(src => src.Departments.Select(dept => dept.Id).ToArray())).
                ForMember(dest => dest.LocationIds, act => act.MapFrom(src => src.Locations.Select(loc => loc.Id).ToArray()));
            CreateMap<DAL.Models.Employee, DTO.Employee>().
                ForMember(dest => dest.DepartmentId, act => act.MapFrom(dest => dest.Department.Id)).
                ForMember(dest => dest.LocationId, act => act.MapFrom(dest => dest.Location.Id)).
                ForMember(dest => dest.ProjectId, act => act.MapFrom(dest => dest.Project.Id)).
                ForMember(dest => dest.RoleId, act => act.MapFrom(dest => dest.Role.Id)).
                ForMember(dest => dest.DepartmentName, act => act.MapFrom(dest => dest.Department.Name)).
                ForMember(dest => dest.LocationName, act => act.MapFrom(dest => dest.Location.Name)).
                ForMember(dest => dest.ProjectName, act => act.MapFrom(dest => dest.Project.Name)).
                ForMember(dest => dest.RoleName, act => act.MapFrom(dest => dest.Role.Name)).
                ForMember(dest => dest.Status, act => act.MapFrom(dest => dest.Status ? "Active" : "Inactive")).
                ForMember(dest => dest.Manager, act => act.MapFrom(dest => dest.ManagerId)).
                ForMember(dest=> dest.JoiningDate,act=> act.MapFrom(dest=> dest.JoiningDate.ToString())).
                ForMember(dest => dest.DOB, act => act.MapFrom(dest => dest.DOB.ToString()));
            CreateMap<DAL.Models.Employee, EmployeeIdProfile>();
            CreateMap<DAL.Models.Department, DTO.Department>();
            CreateMap<DAL.Models.Project,DTO.Project>();
            CreateMap<DAL.Models.Location,DTO.Location>();

        }

    }
}
