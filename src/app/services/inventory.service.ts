import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Inventory {
  _id?: string;
  farmId: string;
  farm: string;
  itemType: string;
  quantity: number;
  lastUpdated?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'https://capstone-agricultural-management-backend.onrender.com/api/inventory/';

  constructor(private httpClient: HttpClient) { }

  getInventoryByFarm(farmId: string) {
    return this.httpClient.get<Inventory[]>(`${this.apiUrl}farm/${farmId}`, { withCredentials: true });
  }

  getInventory(id: string) {
    return this.httpClient.get<Inventory>(`${this.apiUrl}${id}`,  { withCredentials: true });
  }

  createInventory(inventory: Inventory) {
    return this.httpClient.post<{}>(this.apiUrl, inventory, { withCredentials: true });
  }

  updateInventory(id: string, inventory: Inventory) {
    return this.httpClient.put<{ message: String, inventory: Inventory }>(`${this.apiUrl}${id}`, inventory, { withCredentials: true });
  }

  deleteInventory(id: string) {
    return this.httpClient.delete<{}>(`${this.apiUrl}${id}`, { withCredentials: true });
  }
}
