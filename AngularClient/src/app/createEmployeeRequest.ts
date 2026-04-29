export interface CreateEmployeeRequest {
    name:   string;
    email:  string;
    salary: number;
    
    phone?:   string | null;
    notes?:   string | null;
    address?: string | null;
}