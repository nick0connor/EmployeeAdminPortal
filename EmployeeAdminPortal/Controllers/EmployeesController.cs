using EmployeeAdminPortal.Data;
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
    }
}
