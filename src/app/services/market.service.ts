import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Market {
  _id?: string;
  farmId: string;
  farm: string;
  product: string;
  price: number;
  quantity: number;
  orderStatus?: string;
  buyerId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private apiUrl = 'http://localhost:5000/api/market/';

  constructor(private httpClient: HttpClient) { }

  getMarketListingsByFarm(farmId: string) {
    return this.httpClient.get<Market[]>(`${this.apiUrl}farm/${farmId}`, { withCredentials: true });
  }

  getMarketListings() {
    return this.httpClient.get<Market>(`${this.apiUrl}`, { withCredentials: true });
  }

  createMarketListing(market: Market) {
    return this.httpClient.post<{}>(this.apiUrl, market, { withCredentials: true });
  }

  updateMarketListing(id: string, market: Market) {
    return this.httpClient.put<{ message: String, market: Market }>(`${this.apiUrl}${id}`, market, { withCredentials: true });
  }

  deleteMarketListing(id: string) {
    return this.httpClient.delete<{}>(`${this.apiUrl}${id}`, { withCredentials: true });
  }
}
