import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { OrderService, OrderStatusHistory } from '../../core/order.service';

@Component({
  selector: 'app-order-status-history',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, DatePipe],
  templateUrl: './order-status-history.component.html'
})
export class OrderStatusHistoryComponent {
  id = 0;
  history: OrderStatusHistory[] | null = null;

  constructor(private route: ActivatedRoute, private orderSvc: OrderService) {
    this.id = Number(this.route.snapshot.paramMap.get('id') || 0);
    this.orderSvc.getHistory(this.id).subscribe(v => this.history = v ?? []);
  }
}
