import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  role: string = ''; // Store user role
  selectedMenu: string = ''; // Track selected sidebar menu

  // Define menu items based on roles
  menuItems: { label: string; route: string; role: string[] }[] = [
    { label: 'Farms', route: 'farms', role: ['farmer'] },
    { label: 'Crop Health', route: 'crop-health', role: ['farmer'] },
    { label: 'Resource Usage', route: 'resources', role: ['farmer'] },
    { label: 'Inventory', route: 'inventory', role: ['farmer'] },
    { label: 'Finance', route: 'finance', role: ['farmer'] },
    { label: 'Market', route: 'market', role: ['farmer', 'buyer'] },
    { label: 'Advisory & Training', route: 'advisory', role: ['farmer', 'consultant'] },
    { label: 'Notifications', route: 'notifications', role: ['All'] },
    { label: 'Users', route: 'users', role: ['admin'] }
  ];

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.role = this.authService.getRole(); // Fetch role from AuthService
    this.selectedMenu = this.router.getCurrentNavigation()?.extras.state?.['path'] || this.menuItems[0].route;
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
