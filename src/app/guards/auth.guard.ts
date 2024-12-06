import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router);
  const isAuthenticated = authService.isLoggedIn();
  const requiredRole: string[] = route.data?.['roles'];

  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  if (requiredRole && !authService.hasRole(requiredRole)) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
