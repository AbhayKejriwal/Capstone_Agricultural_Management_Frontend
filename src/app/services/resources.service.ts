import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Resource {
  _id?: string;
  farmId: string;
  farm: string;
  itemType: string;
  quantity: number;
  usageDate?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  private apiUrl = 'https://capstone-agricultural-management-backend.onrender.com/api/resources/';

  constructor(private httpClient: HttpClient) { }

  getResourcesByFarm(farmId: string) {
    return this.httpClient.get<Resource[]>(`${this.apiUrl}farm/${farmId}`, { withCredentials: true });
  }

  getResource(id: string) {
    return this.httpClient.get<Resource>(`${this.apiUrl}${id}`,  { withCredentials: true });
  }

  createResource(resource: Resource) {
    return this.httpClient.post<{}>(this.apiUrl, resource, { withCredentials: true });
  }

  updateResource(id: string, resource: Resource) {
    return this.httpClient.put<{ message: String, resource: Resource }>(`${this.apiUrl}${id}`, resource, { withCredentials: true });
  }

  deleteResource(id: string) {
    return this.httpClient.delete<{}>(`${this.apiUrl}${id}`, { withCredentials: true });
  }
}
