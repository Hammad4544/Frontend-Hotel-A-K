import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  // Auth Layout
  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout')
        .then(c => c.AuthLayout),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login')
            .then(c => c.Login),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register')
            .then(c => c.Register),
        title: 'Register',
      },
    ],
  },

  // Blank Layout
  {
    path: '',
    loadComponent: () =>
      import('./layouts/blank-layout/blank-layout')
        .then(c => c.BlankLayout),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home')
            .then(c => c.Home),
        title: 'Home',
      },
      {
        path: 'booking',
        loadComponent: () =>
          import('./pages/booking/booking')
            .then(c => c.Booking),
        title: 'Booking',
      },
      {
        path: 'connectUs',
        loadComponent: () =>
          import('./pages/connect-us/connect-us')
            .then(c => c.ConnectUs),
        title: 'Connect Us',
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about/about')
            .then(c => c.About),
        title: 'About',
      },
      {
        path: 'rooms',
        loadComponent: () =>
          import('./pages/rooms/rooms')
            .then(c => c.Rooms),
        title: 'Rooms',
      },
      {
        path: 'details/:roomId',
        loadComponent: () =>
          import('./pages/details/details')
            .then(c => c.Details),
        title: 'Details',
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/not-found/not-found')
            .then(c => c.NotFound),
        title: 'Not Found',
      },
    ],
  },
];
