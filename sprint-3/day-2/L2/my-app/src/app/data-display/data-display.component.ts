// data-display.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css'],
})
export class DataDisplayComponent implements OnInit, OnDestroy {
  data: any;
  error: any;
  private subscription: Subscription=new Subscription();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Subscribe to the observable
    this.subscription = this.dataService.generateObservable().subscribe(
      (result) => {
        // Handle the received data
        this.data = result;
        this.error = null; // Reset error if data is received successfully
        console.log('Received data:', result);
      },
      (error) => {
        // Handle errors
        this.error = 'An error occurred while fetching data.';
        console.error('Error:', error);
      }
    );
  }

  ngOnDestroy(): void {
    // Clean up to avoid memory leaks
    this.subscription.unsubscribe();
  }
}
