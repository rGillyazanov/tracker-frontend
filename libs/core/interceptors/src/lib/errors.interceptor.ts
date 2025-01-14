import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MessageService, ToastMessageOptions } from 'primeng/api';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errors: { [key: number]: ToastMessageOptions } = {
        401: {
          severity: 'warn',
          summary: 'Ошибка доступа',
          detail:
            'Несанкционированный доступ - перенаправление на страницу входа в систему.',
        },
        403: {
          severity: 'warn',
          summary: 'Ошибка доступа',
          detail: 'Несанкционированный доступ - у вас недостаточно прав.',
        },
        429: {
          severity: 'error',
          summary: 'Ошибка',
          detail:
            'Слишком много попыток входа. Пожалуйста, попробуйте ещё раз позже.',
        },
        500: {
          severity: 'error',
          summary: 'Ошибка',
          detail: 'Внутренняя ошибка сервера',
        },
      };

      const message = errors[error.status] || {
        severity: 'error',
        summary: 'Ошибка',
        detail: error.error.message,
      };

      messageService.add({ ...message, life: 5000 });

      // Возврат ошибки для дальнейшей обработки
      return throwError(() => error);
    }),
  );
};
