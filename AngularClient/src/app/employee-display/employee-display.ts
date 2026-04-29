import { Component, input } from '@angular/core';
import { EmployeeInfo } from '../employeeInfo';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-display',
  imports: [RouterLink],
  templateUrl: './employee-display.html',
  styleUrl: './employee-display.css',
})
export class EmployeeDisplay {
  employeeObject = input.required<EmployeeInfo>();
}
