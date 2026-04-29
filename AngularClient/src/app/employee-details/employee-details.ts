import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { EmployeeInfo } from '../employeeInfo';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employeeService';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateEmployeeRequest } from '../createEmployeeRequest';

@Component({
  selector: 'app-employee-details',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css',
})
export class EmployeeDetails {
  route: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  employeeService = inject(EmployeeService);
  cdr = inject(ChangeDetectorRef);

  employee: EmployeeInfo | null = null;
  editsEnabled: Boolean = false;
  
  changeInfoForm = new FormGroup({
    newName: new FormControl(this.employee?.name),
    newEmail: new FormControl(this.employee?.email),
    newSalary: new FormControl(this.employee?.salary),
    newPhone: new FormControl(this.employee?.phone),
    newAddress: new FormControl(this.employee?.address),
    newNotes: new FormControl(this.employee?.notes)
  });

  constructor() {
    const employeeId = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(employeeId).subscribe({
      next: (data) => {
        this.employee = data;
        this.changeInfoForm.patchValue({
          newName: data.name,
          newEmail: data.email,
          newSalary: data.salary,
          newPhone: data.phone,
          newAddress: data.address,
          newNotes: data.notes,
        });
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Api Error: ", err);
      }
    });
  }

  toggleUpdates() {
    this.editsEnabled = !this.editsEnabled

    if(this.editsEnabled) { this.changeInfoForm.enable() }
    else { this.changeInfoForm.disable() }
  }

  updateEmployeeInfo() {
    const newEmployee: CreateEmployeeRequest = {
      // ! asserts value will not be null
      name: this.changeInfoForm.getRawValue().newName ?? this.employee!.name, 
      email: this.changeInfoForm.getRawValue().newEmail ?? this.employee!.email,
      salary: this.changeInfoForm.getRawValue().newSalary ?? this.employee!.salary,

      phone: this.changeInfoForm.getRawValue().newPhone,
      address: this.changeInfoForm.getRawValue().newAddress,
      notes: this.changeInfoForm.getRawValue().newNotes
    }

    this.employeeService.updateEmployee(this.employee!.id, newEmployee).subscribe({
      next: (data) => {
        console.log("updated!", data);
        this.router.navigate([this.route.snapshot.url.join('/')]);
      },
      error: (err) => {
        console.error('Api Error: ', err);
      }
    });
  }
}
