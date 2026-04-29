import { Component, inject } from '@angular/core';
import { EmployeeService } from '../employeeService';
import { EmployeeInfo } from '../employeeInfo';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  employeeService: EmployeeService = inject(EmployeeService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  filteredEmployeeList: EmployeeInfo[] = [];
  pageSize: number = 10;
  pageNum: number = 1;

  constructor() {
    this.route.queryParams.subscribe(params => {
      console.log('init')
      const page = +(params['page'] ?? 1);
      this.pageNum = page;
      this.updateEmployeeList(page);
    })
  }

  updateEmployeeList(page: number) {
    this.employeeService.getEmployees(page, this.pageSize).subscribe({
      next: (data) => {
        console.log("Data: ", data);
        this.filteredEmployeeList = data;
      },
      error: (err) => {
        console.error("Api Error: ", err);
      }
    });
  }

  changePage(delta: number) {
    const currentPage = +(this.route.snapshot.queryParamMap.get('page') ?? 1);
    const newPage = currentPage + delta;

    if (newPage < 1) return;
    if (newPage > currentPage && this.filteredEmployeeList.length < this.pageSize) return;

    this.router.navigate([], {
      queryParams: { page: newPage },
      queryParamsHandling: 'merge'
    });
  }
}
