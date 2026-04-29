import {Routes} from '@angular/router';
import {Home} from './home/home';

const routeConfig: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home page',
  }//,
  // {
  //   path: 'lookup/:id',
  //   component: Lookup,
  //   title: 'Find employee by ID',
  // },
  // {
  //   path: 'filter',
  //   component: Search,
  //   title: 'Search for Employees',
  // },
];

export default routeConfig;