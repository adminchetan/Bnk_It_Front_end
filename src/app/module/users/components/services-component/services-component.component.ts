import { Component } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../common/animation/loading/loading.component';

@Component({
  selector: 'app-services-component',
  standalone: true,
  imports: [CommonModule,LoadingComponent],
  templateUrl: './services-component.component.html',
  styleUrl: './services-component.component.css'
})
export class ServicesComponentComponent {
  
  ServerDetails: any[] = [];//To store available services subscribed
  DomainsDetails:any[]=[];
  isLoading=false;
  constructor(private apiService: ApiCallService) { }
  ngOnInit(): void {
    this.getServerDetails();
    this. getDomainsDetails();
  }

  getServerDetails(): void {
    this.isLoading=true;
    this.apiService.getServerDetails().subscribe(
      (response) => {
        console.log('ServerDetails:', response.data); // Assuming your API response has 'data' property
        this.ServerDetails = response.data; // Assign the data to your component property
        this.isLoading=false;
      },
      (error) => {
        console.error('Error fetching services:', error);
        this.isLoading=false;
      }
    );
  }


  getDomainsDetails(): void {
    this.isLoading=true;
    this.apiService.getDomainsDetails().subscribe(
      (response) => {
        console.log('Domains Details:', response.data); // Assuming your API response has 'data' property
        this.DomainsDetails = response.data; // Assign the data to your component property
        this.isLoading=false;
      },
      (error) => {
        this.isLoading=false;
        console.error('Error fetching services:', error);
        // Handle error as needed
      }
    );
  }





  getRemainingDays(expiryDate: string): number {
    if (!expiryDate) {
      console.error('Expiry date is missing or invalid:', expiryDate);
      return 0; // Handle if expiryDate is undefined or null
    }

    const parts = expiryDate.split('-');
    if (parts.length !== 3) {
      console.error('Invalid date format:', expiryDate);
      return 2; // Handle unexpected date format
    }

    // Parse date parts assuming 'dd-mm-yyyy' format
    const day = +parts[0];
    const month = +parts[1] - 1; // Month is 0-indexed in JavaScript Date constructor
    const year = +parts[2];

    // Create Date objects for today and expiry date
    const today = new Date();
    const expiry = new Date(year, month, day);

    // Calculate difference in milliseconds
    const diffTime = Math.abs(expiry.getTime() - today.getTime());

    // Convert difference to days
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  }


}
