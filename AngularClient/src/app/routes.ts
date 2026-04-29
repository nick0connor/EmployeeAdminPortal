import {Routes} from '@angular/router';
import {Home} from './home/home';
import { EmployeeDetails } from './employee-details/employee-details';
import { CreateEmployee } from './create-employee/create-employee';

const routeConfig: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home page',
  },
  {
    path: 'details/:id',
    component: EmployeeDetails,
    title: 'All Details about an employee',
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'new',
    component: CreateEmployee,
    title: 'Create New Employee'  
  }
];

export default routeConfig;