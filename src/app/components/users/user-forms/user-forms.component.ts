import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, User } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-forms',
  templateUrl: './user-forms.component.html'
})
export class UserFormsComponent implements OnInit {
  userForm: FormGroup;
  editUserId!: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      role: ['', Validators.required],
      phoneNumber: [''],
      isActive: [true],
    });
  }

  ngOnInit() {
    this.editUserId = this.route.snapshot.params['id'];
    if (this.editUserId) {
      this.authService.getUser(this.editUserId).subscribe((result) => {
        this.userForm.patchValue(result);
      });
    }
  }

  mapFormToUser(): User {
    const user: User = {
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      role: this.userForm.value.role,
      phoneNumber: this.userForm.value.phoneNumber,
      isActive: this.userForm.value.isActive,
    };
    if (this.userForm.value.password) {
      user.password = this.userForm.value.password;
    }
    return user;
  }

  addUser() {
    if (this.userForm.valid) {
      const user: User = this.mapFormToUser();
      this.authService.createUser(user).subscribe(
        () => {
          console.log('User created successfully');
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log('Error:', error);
          alert(`Error in creating user: ${error.error.message}`);
        }
      );
    } else {
      alert('Please fill all the fields. Password is required to create new user.');
    }
  }

  updateUser() {
    if (this.userForm.valid) {
      const user: User = this.mapFormToUser();
      this.authService.updateUser(this.editUserId, user).subscribe(
        () => {
          console.log('User updated successfully');
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log('Error:', error);
          alert(`Error in updating user: ${error.error.message}`);
        }
      );
    } else {
      alert('Please fill all the fields');
    }
  }
}
