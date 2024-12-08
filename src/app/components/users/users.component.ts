import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  error: string | null = null;
  loading: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.error = 'Failed to load users';
        this.loading = false;
      }
    );
  }

  deleteUser(id: string) {
    const ok = confirm('Are you sure you want to delete this user?');
    if (ok) {
      this.authService.deleteUser(id).subscribe(
        () => {
          this.users = this.users.filter((user) => user._id !== id);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  updateUser(id: string, user: Partial<User>) {
    this.authService.updateUser(id, user).subscribe(
      () => {
        const index = this.users.findIndex((u) => u._id === id);
        if (index !== -1) {
          this.users[index] = { ...this.users[index], ...user };
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
