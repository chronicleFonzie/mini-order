import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface OrderStatusHistory { date: string; status: string; comment: string; }
export interface Order {
  id: number;
  customerName: string;
  product: string;
  total: number;
  status: string;
  history: OrderStatusHistory[];
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private base = environment.apiBase;

  constructor(private http: HttpClient) { }

  getOrder(id: number) {
    return this.http.get<Order>(`${this.base}/orders/${id}`).pipe(
      catchError(() => of(null))
    );
  }

  getHistory(id: number) {
    return this.http.get<OrderStatusHistory[]>(`${this.base}/orders/${id}/history`).pipe(
      catchError(() => of(null))
    );
  }
}
