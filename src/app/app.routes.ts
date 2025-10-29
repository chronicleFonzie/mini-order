import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { OrderStatusHistoryComponent } from './pages/order-detail/order-status-history.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'orders/:id', component: OrderDetailComponent },
  { path: 'orders/:id/history', component: OrderStatusHistoryComponent },
  { path: '**', redirectTo: '' }
];
