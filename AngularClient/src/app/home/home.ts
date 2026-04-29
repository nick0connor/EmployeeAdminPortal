import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { EmployeeService } from '../employeeService';
import { EmployeeInfo } from '../employeeInfo';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterEmployeeRequest } from '../filterEmployeeRequest';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  employeeService: EmployeeService = inject(EmployeeService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);

  filteredEmployeeList: EmployeeInfo[] = [];
  pageSize: number = 10;
  pageNum: number = 1;

  filterForm = new FormGroup({
    formName: new FormControl(null),
    formEmail: new FormControl(null),
    formMinSal: new FormControl(null),
    formMaxSal: new FormControl(null)
  });

  constructor() {
    this.route.queryParams.subscribe(params => {
      const page = +(params['page'] ?? 1);
      this.pageNum = page;
      this.filterResults(page);
    })
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

  filterResults(page?: number | undefined){
    const numHelper = (input: string | null | undefined): number | undefined => 
      (input != null && input != undefined && input != "") ? Number(input) : undefined;
    
    const stringHelper = (input: string | null | undefined): string | undefined => 
      (input != null && input != undefined && input != "") ? input : undefined;

    const filterEmployeeRequest: FilterEmployeeRequest = {
      name: stringHelper(this.filterForm.value.formName),
      email: stringHelper(this.filterForm.value.formEmail),
      minSalary: numHelper(this.filterForm.value.formMinSal),
      maxSalary: numHelper(this.filterForm.value.formMaxSal),
    };

    if (page == null || page == undefined){
      this.route.queryParams.subscribe(params => { page = +(params['page'] ?? 1); })
    }

    this.employeeService.getEmployeesFiltered(filterEmployeeRequest, page, this.pageSize).subscribe({
      next: (data) => {
        this.filteredEmployeeList = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Api Error: ", err);
      }
    });
  }
}
