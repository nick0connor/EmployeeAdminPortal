import {Routes} from '@angular/router';
import {Home} from './home/home';
import { EmployeeDetails } from './employee-details/employee-details';

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
  }
];

export default routeConfig;