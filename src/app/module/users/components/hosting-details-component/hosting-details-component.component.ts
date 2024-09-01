import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';

@Component({
  selector: 'app-hosting-details-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hosting-details-component.component.html',
  styleUrl: './hosting-details-component.component.css'
})
export class HostingDetailsComponentComponent implements OnInit{

  constructor(private apiService: ApiCallService) { }

  ngOnInit(): void {
    this.getCompleteHostingDetailsOfUser();
  }
  ServerDetails:any[]=[];

  getCompleteHostingDetailsOfUser(): void {
    this.apiService.getCompleteHostingDetailsOfUser().subscribe(
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
