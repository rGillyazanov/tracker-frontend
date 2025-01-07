import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('@tracker/auth').then((m) => m.authRoutes),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('@tracker/not-found').then((m) => m.NotFoundComponent),
    title: 'Страница не найдена',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'not-found',
  },
];
