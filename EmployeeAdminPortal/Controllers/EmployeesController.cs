using EmployeeAdminPortal.Data;
using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAdminPortal.Controllers {
    [Route("api/[controller]")] // <-- localhost:XXXX/api/employees
    [ApiController]
    public class EmployeesController : ControllerBase {
        private readonly ApplicationDbContext dbContext;

        public EmployeesController(ApplicationDbContext dbContext) {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllEmployees() {
            var allEmployees = dbContext.Employees.ToList();    // Conect to DB (dbContext) and return all elements of table
            return Ok(allEmployees);                            // Since this is an HTTP request we have to 'send a 200 response'
        }

        [HttpPost]
        public IActionResult AddEmployee(AddEmployeeDto addEmployeeDto) {
            // We use DTO (Data Transfer Object) here because it abstracts what code is visible on either side of our database.
            // It doesn't matter much in this scenario but it allows more modularity
            var employeeEntity = new Employee() {               
                Name    = addEmployeeDto.Name,
                Email   = addEmployeeDto.Email,
                Salary  = addEmployeeDto.Salary,
                Phone   = addEmployeeDto.Phone,
                Notes   = addEmployeeDto.Notes,
                Address = addEmployeeDto.Address,
            };

            dbContext.Employees.Add(employeeEntity);            // This stages changes but doesn't modify the DB itself
            dbContext.SaveChanges();                            // THIS is what actually makes our changes real

            return Ok(employeeEntity);
        }
    }
}
