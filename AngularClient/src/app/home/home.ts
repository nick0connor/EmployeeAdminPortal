import { Component, inject } from '@angular/core';
import { EmployeeService } from '../employeeService';
import { EmployeeInfo } from '../employeeInfo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  employeeService: EmployeeService = inject(EmployeeService);
  employeeList: EmployeeInfo[] = [];
  filteredEmployeeList: EmployeeInfo[] = [];

  constructor() {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        console.log("Data: ", data);
        this.employeeList = data;
        this.filteredEmployeeList = data;
      },
      error: (err) => {
        console.error("Api Error: ", err);
      }
    });
  }
}
