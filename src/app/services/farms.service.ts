import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Farm {
  _id?: string;
  farmerId: string;
  location: string;
  size: number;
  soilType: string;
  cropDetails: string;
  status: {
    type: string;
    enum: ['active', 'inactive'];
  }
}

@Injectable({
  providedIn: 'root'
})
export class FarmsService {
  private apiUrl = 'http://localhost:5000/api/farms';

  constructor(private httpClient: HttpClient) { }

  getFarms() {
    return this.httpClient.get<Farm[]>(this.apiUrl);
  }

  getFarm(id: string) {
    return this.httpClient.get<Farm>(`${this.apiUrl}/${id}`);
  }

  createFarm(farm: Farm) {
    return this.httpClient.post<{}>(this.apiUrl, farm);
  }

  updateFarm(id: string, farm: Farm) {
    return this.httpClient.put<{ message: String, farm: Farm }>(`${this.apiUrl}/${id}`, farm);
  }

  deleteFarm(id: string) {
    return this.httpClient.delete<{}>(`${this.apiUrl}/${id}`);
  }
}
