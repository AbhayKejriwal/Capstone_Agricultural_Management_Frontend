import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Notification {
  _id: string;
  userId: string;
  message: string;
  type: string;
  status?: string;
  timestamp?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private apiUrl = 'http://localhost:5000/api/notifications/';

  constructor(private http: HttpClient) { }

  getNotifications() {
    return this.http.get<Notification[]>(this.apiUrl, { withCredentials: true });
  }

  getUnreadNotifications() {
    return this.http.get<Notification[]>(`${this.apiUrl}unread`, { withCredentials: true });
  }

  markAsRead(id: string) {
    return this.http.put<Notification>(`${this.apiUrl}${id}`, {}, { withCredentials: true });
  }

  markAllAsRead() {
    return this.http.put<Notification[]>(`${this.apiUrl}readAll`, {}, { withCredentials: true });
  }

  deleteNotification(id: string) {
    return this.http.delete<Notification>(`${this.apiUrl}${id}`, { withCredentials: true });
  }

  deleteAllNotifications() {
    return this.http.delete<Notification[]>(this.apiUrl, { withCredentials: true });
  }
}
