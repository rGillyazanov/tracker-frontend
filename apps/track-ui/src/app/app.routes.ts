import { Route } from '@angular/router';
import { authGuardFn, nonAuthGuardFn } from '@tracker/guards';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('@tracker/home').then((m) => m.homeRoutes),
    canActivate: [authGuardFn],
  },
  {
    path: 'auth',
    loadChildren: () => import('@tracker/auth').then((m) => m.authRoutes),
    canActivate: [nonAuthGuardFn],
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
