import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponentComponent } from '../navbar-component/navbar-component.component';
import { CardviewComponentComponent } from '../cardview-component/cardview-component.component';
import { FooterComponentComponent } from '../footer-component/footer-component.component';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [RouterOutlet,CardviewComponentComponent],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

}
