import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { OrderService, Order, OrderStatusHistory } from '../../core/order.service';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, DatePipe],
  templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent {
  id = 0;
  order: Order | null = null;
  history: OrderStatusHistory[] | null = null;

  constructor(private route: ActivatedRoute, private orderSvc: OrderService) {
    this.id = Number(this.route.snapshot.paramMap.get('id') || 0);
    this.orderSvc.getOrder(this.id).subscribe(v => this.order = v);
    this.orderSvc.getHistory(this.id).subscribe(v => this.history = v ?? []);
  }
}
