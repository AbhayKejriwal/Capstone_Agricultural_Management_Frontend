import { Component, OnInit } from '@angular/core';
import { NotificationsService, Notification } from '../../services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  error: string | null = null;
  loading: boolean = true;

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit() {
    this.notificationsService.getNotifications().subscribe(
      (notifications) => {
        this.notifications = notifications;
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.error = 'Failed to load notifications';
        this.loading = false;
      }
    );
  }

  markAsRead(id: string) {
    this.notificationsService.markAsRead(id).subscribe(
      () => {
        const notification = this.notifications.find(n => n._id === id);
        if (notification) {
          notification.status = 'read';
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteNotification(id: string) {
    this.notificationsService.deleteNotification(id).subscribe(
      () => {
        this.notifications = this.notifications.filter(n => n._id !== id);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  markAllAsRead() {
    this.notificationsService.markAllAsRead().subscribe(
      () => {
        this.notifications.forEach(n => n.status = 'read');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  deleteAllNotifications() {
    this.notificationsService.deleteAllNotifications().subscribe(
      () => {
        this.notifications = [];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  allRead(): boolean {
    return this.notifications.every(n => n.status === 'read');
  }

  anyNotifications(): boolean {
    return this.notifications.length > 0;
  }
}
