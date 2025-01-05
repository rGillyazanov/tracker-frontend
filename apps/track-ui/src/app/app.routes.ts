import { Route } from '@angular/router';

/**
 * Страница не найдена (404)
 */
const notFoundRoutes: Route[] = [
  {
    path: 'not-found',
    loadComponent: () =>
      import('@tracker/not-found').then((m) => m.NotFoundComponent),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'not-found',
  },
];

/**
 * Страницы авторизации, регистрации, восстановления пароля.
 */
const authRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('@tracker/auth').then((m) => m.authRoutes),
  },
];

export const appRoutes: Route[] = [...authRoutes, ...notFoundRoutes];
