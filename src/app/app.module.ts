import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatIconModule } from '@angular/material/icon';
// import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatGridListModule } from '@angular/material/grid-list';
// import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { UnauthorizedComponent } from './components/auth/unauthorized/unauthorized.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FarmsComponent } from './components/farms/farms.component';
import { CropHealthComponent } from './components/crop-health/crop-health.component';
import { FarmFormsComponent } from './components/farms/farm-forms/farm-forms.component';
import { CropHealthFormsComponent } from './components/crop-health/crop-health-forms/crop-health-forms.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { InventoryFormsComponent } from './components/inventory/inventory-forms/inventory-forms.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { ResourcesFormsComponent } from './components/resources/resources-forms/resources-forms.component';
import { FinanceComponent } from './components/finance/finance.component';
import { FinanceFormsComponent } from './components/finance/finance-forms/finance-forms.component';
import { MarketComponent } from './components/market/market.component';
import { MarketFormsComponent } from './components/market/market-forms/market-forms.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { UsersComponent } from './components/users/users.component';
import { UserFormsComponent } from './components/users/user-forms/user-forms.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UnauthorizedComponent,
    DashboardComponent,
    FarmsComponent,
    CropHealthComponent,
    FarmFormsComponent,
    CropHealthFormsComponent,
    InventoryComponent,
    InventoryFormsComponent,
    ResourcesComponent,
    ResourcesFormsComponent,
    FinanceComponent,
    FinanceFormsComponent,
    MarketComponent,
    MarketFormsComponent,
    NotificationsComponent,
    UsersComponent,
    UserFormsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    // MatGridListModule,
    // MatCardModule,
    // MatSidenavModule,
    // MatIconModule,
    // MatListModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
