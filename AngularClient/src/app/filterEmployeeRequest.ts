export interface FilterEmployeeRequest {
    name?:      string | undefined;
    email?:     string | undefined;
    minSalary?: number | undefined;
    maxSalary?: number | undefined;
}