import { Injectable } from '@angular/core';
import { EmployeeInfo } from './employeeInfo';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CreateEmployeeRequest } from './createEmployeeRequest';
import { FilterEmployeeRequest } from './filterEmployeeRequest';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    readonly url = 'https://localhost:7151/api/Employees';

    constructor(private http: HttpClient) {}

    /******************************************** GET CALLS ********************************************/
    async getAllEmployees(): Promise<EmployeeInfo[]> {
        return await firstValueFrom(
            this.http.get<EmployeeInfo[]>(`${this.url}/all`)
        );
    }

    async getEmployees(page: number = 1, pageSize: number = 10): Promise<EmployeeInfo[]> {
        const params = new HttpParams()
            .set('page', page)
            .set('pageSize', pageSize);

        return await firstValueFrom(
            this.http.get<EmployeeInfo[]>(this.url, { params })
        );
    }

    async getEmployeeById(id: string): Promise<EmployeeInfo> {
        return await firstValueFrom(
            this.http.get<EmployeeInfo>(`${this.url}/${id}`)
        );
    }

    async getEmployeesFiltered(
        filters: FilterEmployeeRequest, page: number = 1, pageSize: number = 10
    ): Promise<EmployeeInfo[]> {

        let params = new HttpParams()
            .set('page', page)
            .set('pageSize', pageSize);
        
        if(filters.name !== undefined){ 
            params = params.set('Name', filters.name); 
        }

        if(filters.email !== undefined){ 
            params = params.set('Email', filters.email); 
        }

        if(filters.minSalary !== undefined){ 
            params = params.set('MinSalary', filters.minSalary); 
        }

        if(filters.maxSalary !== undefined){ 
            params = params.set('MaxSalary', filters.maxSalary); 
        }

        return await firstValueFrom(
            this.http.get<EmployeeInfo[]>(`${this.url}/filters`, { params })
        );
    }

    /******************************************** POST CALLS ********************************************/
    addEmployee(employee: CreateEmployeeRequest) {
        return this.http.post<EmployeeInfo>(this.url, employee);
    }

    /******************************************** PUT CALLS *********************************************/
    updateEmployee(id: string, employee: CreateEmployeeRequest) {
        return this.http.put<void>(`${this.url}/${id}`, employee);
    }

    /******************************************* DELETE CALLS *******************************************/
    deleteEmployee(id: string) {
        return this.http.delete<void>(`${this.url}/${id}`)
    }
}