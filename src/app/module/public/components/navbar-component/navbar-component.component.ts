import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar-component.component.html',
  styleUrl: './navbar-component.component.css'
})
export class NavbarComponentComponent {


  @ViewChild('myLink') myLink: ElementRef | undefined;

  constructor(private renderer: Renderer2, private el: ElementRef,private router: Router) {}
  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
      // Check if the clicked element is not inside the navbar
      if (!this.el.nativeElement.contains(event.target)) {
          const navbarCollapse = this.el.nativeElement.querySelector('.navbar-collapse');
          this.renderer.removeClass(navbarCollapse, 'show'); // Hide the navbar collapse
      }
  }

  focusProductSection() {
    this.router.navigate(['/Index/Products'], { fragment: 'product-section' });
  }


}
