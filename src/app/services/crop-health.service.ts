import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface CropHealth {
  _id?: string;
  farmId: string;
  farm: string;
  healthStatus: string;
  issueDetected?: string;
  recommendation?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CropHealthService {
  private apiUrl = 'https://capstone-agricultural-management-backend.onrender.com/api/cropHealth/';

  constructor(private httpClient: HttpClient) { }

  getCropHealthByFarm(farmId: string) {
    return this.httpClient.get<CropHealth[]>(`${this.apiUrl}farm/${farmId}`, { withCredentials: true });
  }

  getCropHealth(id: string) {
    return this.httpClient.get<CropHealth>(`${this.apiUrl}${id}`,  { withCredentials: true });
  }

  createCropHealth(cropHealth: CropHealth) {
    return this.httpClient.post<{}>(this.apiUrl, cropHealth, { withCredentials: true });
  }

  updateCropHealth(id: string, cropHealth: CropHealth) {
    return this.httpClient.put<{ message: String, cropHealth: CropHealth }>(`${this.apiUrl}${id}`, cropHealth, { withCredentials: true });
  }

  deleteCropHealth(id: string) {
    return this.httpClient.delete<{}>(`${this.apiUrl}${id}`, { withCredentials: true });
  }
}
