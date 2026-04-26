namespace EmployeeAdminPortal.Models {
    public class SearchFiltersDto {
        public string? Name {get; set;}
        public string? Email {get; set;}
        public decimal? MinSalaray {get; set;}
        public decimal? MaxSalary { get; set; }
    }
}
