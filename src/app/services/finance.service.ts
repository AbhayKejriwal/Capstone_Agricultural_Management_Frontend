import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Finance {
  _id?: string;
  farmId: string;
  farm: string;
  transactionType: string;
  amount: number;
  date: Date;
  details?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  private apiUrl = 'https://capstone-agricultural-management-backend.onrender.com/api/finance/';

  constructor(private httpClient: HttpClient) {}

  getFinanceByFarm(farmId: string) {
    return this.httpClient.get<Finance[]>(`${this.apiUrl}farm/${farmId}`, {
      withCredentials: true,
    });
  }

  getFinance(id: string) {
    return this.httpClient.get<Finance>(`${this.apiUrl}${id}`, {
      withCredentials: true,
    });
  }

  createFinance(finance: Finance) {
    return this.httpClient.post<{}>(this.apiUrl, finance, {
      withCredentials: true,
    });
  }

  updateFinance(id: string, finance: Finance) {
    return this.httpClient.put<{ message: String; finance: Finance }>(
      `${this.apiUrl}${id}`,
      finance,
      { withCredentials: true }
    );
  }

  deleteFinance(id: string) {
    return this.httpClient.delete<{}>(`${this.apiUrl}${id}`, {
      withCredentials: true,
    });
  }

  getFarmFinance(farmId: string) {
    return this.httpClient.get<{
      totalCredit: number;
      totalIncome: number;
      totalExpense: number;
    }>(`${this.apiUrl}total/farm/${farmId}`, { withCredentials: true });
  }
}
