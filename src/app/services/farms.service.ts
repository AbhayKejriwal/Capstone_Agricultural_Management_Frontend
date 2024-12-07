import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Farm {
  _id?: string;
  farmerId?: string;
  location: string;
  size: number;
  soilType: string;
  cropDetails: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class FarmsService {
  private apiUrl = 'http://localhost:5000/api/farms/';

  constructor(private httpClient: HttpClient) { }

  getFarms() {
    return this.httpClient.get<Farm[]>(this.apiUrl, { withCredentials: true });
  }

  getFarm(id: string) {
    return this.httpClient.get<Farm>(`${this.apiUrl}${id}`, { withCredentials: true });
  }

  createFarm(farm: Farm) {
    return this.httpClient.post<{}>(this.apiUrl, farm, { withCredentials: true });
  }

  updateFarm(id: string, farm: Farm) {
    return this.httpClient.put<{ message: String, farm: Farm }>(`${this.apiUrl}${id}`, farm, { withCredentials: true });
  }

  deleteFarm(id: string) {
    return this.httpClient.delete<{}>(`${this.apiUrl}${id}`, { withCredentials: true });
  }
}
