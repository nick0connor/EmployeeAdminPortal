using EmployeeAdminPortal.Data;
using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace EmployeeAdminPortal.Controllers {
    [Route("api/[controller]")] // <-- localhost:XXXX/api/employees
    [ApiController]
    public class EmployeesController : ControllerBase {
        private readonly ApplicationDbContext dbContext;

        public EmployeesController(ApplicationDbContext dbContext) {
            this.dbContext = dbContext;
        }

        [HttpGet]
        [Route("all")]
        public IActionResult GetAllEmployees() {
            var allEmployees = dbContext.Employees.ToList();    // Conect to DB (dbContext) and return all elements of table
            return Ok(allEmployees);                            // Since this is an HTTP request we have to 'send a 200 response'
        }

        [HttpGet]
        public IActionResult GetEmployees([FromQuery] int page = 1, int pageSize = 10) {

            var employees = dbContext.Employees.OrderBy(e => e.Id)
                .Skip((page - 1) * pageSize).Take(pageSize).ToList();

            return Ok(employees);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult GetEmployeeById(Guid id) {
            var employee = dbContext.Employees.Find(id);

            if (employee == null) return NotFound("Employee ID does not exist!");

            return Ok(employee);
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

        [HttpGet]
        [Route("filters")]
        public IActionResult GetEmployeesFiltered([FromQuery] SearchFiltersDto searchFiltersDto, int page = 1, int pageSize = 10) {
            var allEmployeesQuery = dbContext.Employees.OrderBy(e => e.Id).AsQueryable();

            if (!searchFiltersDto.Name.IsNullOrEmpty()) {
                allEmployeesQuery = allEmployeesQuery.Where(employee => employee.Name.Contains(searchFiltersDto.Name));
            }

            if (!searchFiltersDto.Email.IsNullOrEmpty()) {
                allEmployeesQuery = allEmployeesQuery.Where(employee => employee.Email.Contains(searchFiltersDto.Email));
            }

            if (searchFiltersDto.MinSalaray.HasValue) {
                allEmployeesQuery = allEmployeesQuery.Where(employee => employee.Salary >= searchFiltersDto.MinSalaray);
            }

            if (searchFiltersDto.MaxSalary.HasValue) {
                allEmployeesQuery = allEmployeesQuery.Where(employee => employee.Salary <= searchFiltersDto.MaxSalary);
            }

            return Ok(allEmployeesQuery.Skip((page - 1) * pageSize).Take(pageSize).ToList());
        }

        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult UpdateEmployee(Guid id, UpdateEmployeeDto updateEmployeeDto) {
            var employee = dbContext.Employees.Find(id);

            if (employee == null) return NotFound("Employee ID does not exist!");

            employee.Name    = updateEmployeeDto.Name;
            employee.Email   = updateEmployeeDto.Email;
            employee.Salary  = updateEmployeeDto.Salary;
            employee.Phone   = updateEmployeeDto.Phone;
            employee.Notes   = updateEmployeeDto.Notes;
            employee.Address = updateEmployeeDto.Address;

            dbContext.SaveChanges();
            return Ok(employee);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteEmployee(Guid id) {
            var employee = dbContext.Employees.Find(id);

            if (employee == null) return NotFound("Employee ID does not exist!");

            dbContext.Employees.Remove(employee);
            dbContext.SaveChanges();

            return Ok("Employee deleted!");
        }
    }
}
