import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  role: string = ''; // Store user role
  selectedMenu: string = ''; // Track selected sidebar menu

  // Define menu items based on roles
  menuItems: { label: string; route: string; role: string[] }[] = [
    { label: 'Farms', route: 'farms', role: ['Admin', 'Farmer'] },
    { label: 'Crop Health', route: 'crop-health', role: ['Farmer'] },
    { label: 'Market', route: 'market', role: ['Farmer', 'Buyer', 'Admin'] },
    { label: 'Notifications', route: 'notifications', role: ['All'] },
  ];

  constructor(private authService: AuthService) {
    this.role = this.authService.getRole(); // Fetch role from AuthService
    this.selectedMenu = this.menuItems[0]?.route; // Default selection
  }

  // Check if menu item should be displayed for the current role
  canDisplay(item: { role: string[] }): boolean {
    return item.role.includes(this.role) || item.role.includes('All');
  }

  // Handle menu selection
  onSelectMenu(route: string) {
    this.selectedMenu = route;
  }

  logout() {
    this.authService.logout();
  }
}
