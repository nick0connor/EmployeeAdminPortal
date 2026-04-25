namespace EmployeeAdminPortal.Models.Entities {
    public class Employee {

        public Guid Id { get; set; } // Guid = Globally Unique ID
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required decimal Salary { get; set; }
        public string? Phone { get; set; }
        public string? Notes { get; set; }

        public string? Address { get; set; }
    }
}
