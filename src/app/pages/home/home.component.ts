import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  id?: number;
  constructor(private router: Router) { }
  go() {
    console.log("Just click go to order...")
    if (!Number(this.id)) {
      alert("Enter a number value higher then 1000.");
      return;
    } else if (!this.id || this.id <= 0) {
      alert('Enter a valid order ID (try 1001 or 1002).');
      return;
    }
    this.router.navigate(['/orders', this.id]);
  }

  goToHistory() {
    console.log("Just cliked the go to history.")
    if (!Number(this.id)) {
      alert("Enter a number value higher then 1000.");
      return;
    } else if (!this.id || this.id <= 0) {
      alert('Enter a valid order ID (try 1001 or 1002).');
      return;
    }
    this.router.navigate(['/orders',this.id,'history']);
  }
}
