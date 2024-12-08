import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  _id?: string;
  username: string;
  password?: string;
  email: string;
  role: string;
  phoneNumber?: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://capstone-agricultural-management-backend.onrender.com/api/auth/';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}login`, credentials, {withCredentials: true}).subscribe(
      (response: any) => {
        // console.log(response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']); // Redirect to dashboard
      },
      (error) => {
        console.log(error);
        alert('Invalid credentials. Try again.');
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
    return this.http.post(`${this.apiUrl}register`, user);
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

  getUsers() {
    return this.http.get<User[]>(`${this.apiUrl}`, {withCredentials: true});
  }

  getUser(id: string) {
    return this.http.get<User>(`${this.apiUrl}${id}`, {withCredentials: true});
  }

  getCurrentUser() {
    return this.http.get<User>(`${this.apiUrl}profile`, {withCredentials: true});
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}${id}`, {withCredentials: true});
  }

  createUser(user: User) {
    return this.http.post(`${this.apiUrl}register`, user, {withCredentials: true});
  }

  updateUser(id: string, user: Partial<User>) {
    return this.http.put(`${this.apiUrl}${id}`, user, {withCredentials: true});
  }

  getUsername(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.getCurrentUser().subscribe(
        (user: User) => resolve(user.username),
        (error) => reject(error)
      );
    });
  }
}
