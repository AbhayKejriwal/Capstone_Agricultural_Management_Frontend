import { inject } from '@angular/core';
import { CanActivateFn} from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const isAuthenticated = authService.isLoggedIn();
  const requiredRole: string[] = route.data?.['roles'];

  if (!isAuthenticated) {
    return false;
  }

  if (requiredRole && !authService.hasRole(requiredRole)) {
    return false;
  }

  return true;
};
