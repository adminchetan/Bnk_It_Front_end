import { Component } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../common/animation/loading/loading.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule,LoadingComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  isLoading=false;
  servicesData: any[] = [];//To store available services subscribed
  constructor(private apiService: ApiCallService) { }
  ngOnInit(): void {
    this.getServices();
  }

  getServices(): void {
    this.isLoading=true;
    this.apiService.getAllUserSubscribedServices().subscribe(
      (response) => {
        console.log('Services data:', response.data); // Assuming your API response has 'data' property
        this.servicesData = response.data; // Assign the data to your component property
        this.isLoading=false;
      },
      (error) => {
        console.error('Error fetching services:', error);
        // Handle error as needed
        this.isLoading=false;
      
      }
    );
  }
}
