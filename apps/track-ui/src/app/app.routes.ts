import { Route } from '@angular/router';
import { authGuardFn, nonAuthGuardFn } from '@tracker/core/guards';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('@tracker/apps/track-ui/home').then((m) => m.HomeComponent),
    canActivate: [authGuardFn],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@tracker/apps/track-ui/auth').then((m) => m.authRoutes),
    canActivate: [nonAuthGuardFn],
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('@tracker/apps/track-ui/not-found').then(
        (m) => m.NotFoundComponent,
      ),
    title: 'Страница не найдена',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'not-found',
  },
];
