import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { EmployeeService } from '../employeeService';
import { CreateEmployeeRequest } from '../createEmployeeRequest';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  imports: [ReactiveFormsModule, ɵInternalFormsSharedModule],
  templateUrl: './create-employee.html',
  styleUrl: './create-employee.css',
})
export class CreateEmployee {
  employeeService = inject(EmployeeService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  newEmployeeForm = new FormGroup({
    newName:    new FormControl(null, Validators.required),
    newEmail:   new FormControl(null, Validators.required),
    newSalary:  new FormControl(null, Validators.required),
    newPhone:   new FormControl(null),
    newAddress: new FormControl(null),
    newNotes:   new FormControl(null)
  });

  createEmployee() {
    if(this.newEmployeeForm.invalid) return;

    const newEmployee: CreateEmployeeRequest = {
      name: this.newEmployeeForm.getRawValue().newName!,
      email: this.newEmployeeForm.getRawValue().newEmail!,
      salary: Number(this.newEmployeeForm.getRawValue().newSalary),

      phone: this.newEmployeeForm.getRawValue().newPhone,
      address: this.newEmployeeForm.getRawValue().newAddress,
      notes: this.newEmployeeForm.getRawValue().newNotes
    }

    this.employeeService.addEmployee(newEmployee).subscribe({
      next: (data) => {
        console.log('Created employee: ', data);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Api Error: ', err);
      }
    });
  }
}
