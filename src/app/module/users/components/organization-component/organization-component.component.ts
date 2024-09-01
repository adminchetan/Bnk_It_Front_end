import { Component } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organization-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './organization-component.component.html',
  styleUrl: './organization-component.component.css'
})
export class OrganizationComponentComponent {
  ClientInformation: any[] = [];//To store available services subscribed
  constructor(private apiService: ApiCallService) { }
  ngOnInit(): void 
  {
    this.getServices();
  }
  getServices():void {
    this.apiService.getClientInformation().subscribe(
      (response) => {
        console.log('Services data:', response.data); // Assuming your API response has 'data' property
        this.ClientInformation = response.data; // Assign the data to your component property
      },
      (error) => {
        console.error('Error fetching services:', error);
        // Handle error as needed
      }
    );
  }
  getAccountStatusText(status: number): string {
    switch (status) {
      case 0:
        return 'Deactive';
      case 1:
        return 'About to expire';
      case 2:
        return 'Active';
      default:
        return '';
    }
  }






}
