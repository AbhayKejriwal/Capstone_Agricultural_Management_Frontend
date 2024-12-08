import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  role: string = ''; // Store user role
  selectedMenu: string = ''; // Track selected sidebar menu
  unreadNotifications: boolean = false;

  // Define menu items based on roles
  menuItems: { label: string; route: string; role: string[] }[] = [
    { label: 'Users', route: 'users', role: ['admin'] },
    { label: 'Farms', route: 'farms', role: ['farmer'] },
    { label: 'Crop Health', route: 'crop-health', role: ['farmer'] },
    { label: 'Resource Usage', route: 'resources', role: ['farmer'] },
    { label: 'Inventory', route: 'inventory', role: ['farmer'] },
    { label: 'Finance', route: 'finance', role: ['farmer'] },
    { label: 'Market', route: 'market', role: ['farmer', 'buyer'] },
    { label: 'Advisory & Training', route: 'advisory', role: ['farmer', 'consultant'] },
    { label: 'Notifications', route: 'notifications', role: ['All'] },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {
    this.role = this.authService.getRole(); // Fetch role from AuthService
    // Fetch selected menu from route state
    // If not available, set the first menu which is accessible by the user
    this.selectedMenu = this.router.getCurrentNavigation()?.extras.state?.['path'] || this.menuItems.find(item => this.canDisplay(item))?.route;    
  }

  ngOnInit() {
    this.checkUnreadNotifications();
  }

  checkUnreadNotifications() {
    this.notificationsService.getNotifications().subscribe(
      (notifications) => {
        this.unreadNotifications = notifications.some(n => n.status !== 'read');
      },
      (error) => {
        console.error(error);
      }
    );
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
