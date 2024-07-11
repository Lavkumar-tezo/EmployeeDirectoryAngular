using EmployeeDirectory.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeDirectory.DAL.Repositories
{
    public class AppDbContext:DbContext
    {
        public AppDbContext()
        {

        }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasMany(_ => _.Departments).WithMany(_ => _.Roles).UsingEntity("RoleDepartment");
            modelBuilder.Entity<Role>().HasMany(_ => _.Locations).WithMany(_ => _.Roles).UsingEntity("RoleLocation");
            modelBuilder.Entity<Department>(domain =>
            {
                domain.HasAlternateKey(dept=> dept.Name);
                domain.HasMany(dept => dept.Employees).WithOne(emp => emp.Department).HasForeignKey(emp=>emp.DepartmentId);
            });
            modelBuilder.Entity<Location>(domain =>
            {
                domain.HasAlternateKey(loc => loc.Name);
                domain.HasMany(loc => loc.Employees).WithOne(emp => emp.Location).HasForeignKey(emp=>emp.LocationId);
            });
            modelBuilder.Entity<Project>(domain =>
            {             
                domain.HasAlternateKey(project => project.Name);
                domain.HasMany(project => project.Employees).WithOne(emp => emp.Project).HasForeignKey(emp=>emp.ProjectId).OnDelete(DeleteBehavior.SetNull);
            });
            modelBuilder.Entity<Employee>()
            .HasOne(emp => emp.Manager)
            .WithMany(emp => emp.Subordinates)      
            .HasForeignKey(emp => emp.ManagerId);
            SeedData(modelBuilder);
        }

        public DbSet<Employee> Employees { get; set; }

        public DbSet<Department> Departments { get; set; }

        public DbSet<Project> Projects { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Location> Locations { get; set; }

        private static void SeedData(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>().HasData(
                new Department { Id = "TD001", Name = "Product Eng" },
                new Department { Id = "TD002", Name = "QA" },
                new Department { Id = "TD003", Name = "UI/UX" }
            );

            modelBuilder.Entity<Location>().HasData(
                new Location { Id = "TL001", Name = "Hyderabad" },
                new Location { Id = "TL002", Name = "Bangalore" }
            );

            modelBuilder.Entity<Project>().HasData(
                new Project { Id = "TP001", Name = "Task-1" },
                new Project { Id = "TP002", Name = "Task-2" },
                new Project { Id = "TP003", Name = "Task-3" },
                new Project { Id = "TP004", Name = "Task-4" },
                new Project { Id = "TP005", Name = "Task-5" }
            );

        }
    }
}
