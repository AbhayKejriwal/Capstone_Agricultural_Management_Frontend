import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, credentials, {withCredentials: true}).subscribe(
      (response: any) => {
        // console.log(response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']); // Redirect to dashboard
      },
      (error) => {
        console.log(error);
      }
    );
  }

  register(user: {
    username: string;
    email: string;
    password: string;
    role: string;
    phoneNumber: string;
  }) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getRole(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
    return payload.role;
  }

  hasRole(role: string[]): boolean {
    return role.includes(this.getRole());
  }
}
