import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UnauthorizedComponent } from './components/auth/unauthorized/unauthorized.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { FarmFormsComponent } from './components/farms/farm-forms/farm-forms.component';
import { CropHealthFormsComponent } from './components/crop-health/crop-health-forms/crop-health-forms.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    data: { roles: ['admin', 'farmer', 'buyer', 'consultant'] },
  },
  { path: 'farms/add', component: FarmFormsComponent  },
  { path: 'farms/:id', component: FarmFormsComponent  },
  { path: 'cropHealth/add', component: CropHealthFormsComponent  },
  { path: 'cropHealth/:id', component: CropHealthFormsComponent  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'unauthorized', component: UnauthorizedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
