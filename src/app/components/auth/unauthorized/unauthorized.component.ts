import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="p-6 bg-white rounded-lg shadow-md text-center">
        <h1 class="text-4xl font-bold text-red-500 mb-4">Unauthorized</h1>
        <p class="text-lg mb-6">You do not have permission to access this page.</p>
        <button
          mat-raised-button
          color="primary"
          class="px-6"
          (click)="navigateToLogin()"
        >
          Go to Login
        </button>
      </div>
    </div>
  `,
})
export class UnauthorizedComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
