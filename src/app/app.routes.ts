import { Routes } from '@angular/router';

export const routes: Routes = [
  //create route for home component
  {
    path: '',
    loadComponent: () =>
      import('./pages/users-list/users-list.page').then((m) => m.UsersListPage),
  },
  {
    path: 'user/:id',
    loadComponent: () =>
      import('./pages/user-page/user.page').then((m) => m.UserPage),
  },
];
