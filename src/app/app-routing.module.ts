import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UnauthorizedComponent } from './components/auth/unauthorized/unauthorized.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { FarmFormsComponent } from './components/farms/farm-forms/farm-forms.component';
import { CropHealthFormsComponent } from './components/crop-health/crop-health-forms/crop-health-forms.component';
import { FinanceFormsComponent } from './components/finance/finance-forms/finance-forms.component';
import { InventoryFormsComponent } from './components/inventory/inventory-forms/inventory-forms.component';
import { ResourcesFormsComponent } from './components/resources/resources-forms/resources-forms.component';
import { MarketFormsComponent } from './components/market/market-forms/market-forms.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    data: { roles: ['admin', 'farmer', 'buyer', 'consultant'] },
  },
  {
    path: 'users/add',
    component: UsersComponent,
    canActivate: [authGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'users/:id',
    component: UsersComponent,
    canActivate: [authGuard],
    data: { roles: ['admin'] },
  },

  {
    path: 'farms/add',
    component: FarmFormsComponent,
    canActivate: [authGuard],
    data: { roles: ['farmer'] },
  },
  {
    path: 'farms/:id',
    component: FarmFormsComponent,
    canActivate: [authGuard],
    data: { roles: ['farmer'] },
  },
  {
    path: 'cropHealth/add',
    component: CropHealthFormsComponent,
    canActivate: [authGuard],
    data: { roles: ['farmer'] },
  },
  {
    path: 'cropHealth/:id',
    component: CropHealthFormsComponent,
    canActivate: [authGuard],
    data: { roles: ['farmer'] },
  },
  {
    path: 'finance/add',
    component: FinanceFormsComponent,
    canActivate: [authGuard],
    data: { roles: ['farmer'] },
  },
  {
    path: 'finance/:id',
    component: FinanceFormsComponent,
    canActivate: [authGuard],
    data: { roles: ['farmer'] },
  },
  {
    path: 'inventory/add',
    component: InventoryFormsComponent,
    canActivate: [authGuard],
    data: { roles: ['farmer'] },
  },
  {
    path: 'inventory/:id',
    component: InventoryFormsComponent,
    canActivate: [authGuard],
    data: { roles: ['farmer'] },
  },
  {
    path: 'resource/add',
    component: ResourcesFormsComponent,
    canActivate: [authGuard],
    data: { roles: ['farmer'] },
  },
  {
    path: 'resource/:id',
    component: ResourcesFormsComponent,
    canActivate: [authGuard],
    data: { roles: ['farmer'] },
  },
  {
    path: 'market/add',
    component: MarketFormsComponent,
    canActivate: [authGuard],
    data: { roles: ['farmer'] },
  },
  {
    path: 'market/:id',
    component: MarketFormsComponent,
    canActivate: [authGuard],
    data: { roles: ['farmer'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
