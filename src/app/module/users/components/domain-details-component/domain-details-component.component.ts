import { Component } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-domain-details-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './domain-details-component.component.html',
  styleUrl: './domain-details-component.component.css'
})
export class DomainDetailsComponentComponent {
  constructor(private apiService: ApiCallService) { }
  ngOnInit(): void {
    this.getCompleteDomainDetailsOfUser();
  }
  ServerDetails:any[]=[];

  getCompleteDomainDetailsOfUser(): void {
    this.apiService.getCompleteDomainDetailsOfUser().subscribe(
      (response) => {
        console.log('ServerDetails:', response.data); // Assuming your API response has 'data' property
        this.ServerDetails = response.data; // Assign the data to your component property
      },
      (error) => {
        console.error('Error fetching services:', error);
        // Handle error as needed
      }
    );
  }
}
