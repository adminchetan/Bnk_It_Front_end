import { Component, HostListener, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftnavigationCompoentComponent } from '../leftnavigation-compoent/leftnavigation-compoent.component';
import { ApiCallService } from '../../services/api-call.service';
import { LoadingComponent } from '../../../common/animation/loading/loading.component';

@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [RouterOutlet,LeftnavigationCompoentComponent,LoadingComponent],
  templateUrl: './dashboard-component.component.html',
  styleUrl: './dashboard-component.component.css'
})
export class DashboardComponentComponent {
InitiallyShowLeftNavigation: boolean = true;
UserName= localStorage.getItem("userDisplayName");
isLoading=true;

  toggleMenu() {
    this.InitiallyShowLeftNavigation = !this.InitiallyShowLeftNavigation;
  }
}