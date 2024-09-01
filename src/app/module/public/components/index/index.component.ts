import { Component } from '@angular/core';
import { FooterComponentComponent } from '../footer-component/footer-component.component';
import { NavbarComponentComponent } from '../navbar-component/navbar-component.component';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';

import { BannerComponentComponent } from '../banner-component/banner-component.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [FooterComponentComponent,NavbarComponentComponent,RouterModule,BannerComponentComponent,],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  ngOnInit() {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
        const fragment = this.route.snapshot.fragment;
        if (fragment) {
          this.scrollToSection(fragment);
        }
      });
  }
constructor(private router: Router,private route: ActivatedRoute) {}
ngAfterViewInit() {
  // This is to handle the initial load
  this.route.fragment.subscribe(fragment => {
    if (fragment) {
      this.scrollToSection(fragment);
    }
  });
}




scrollToSection(fragment: string) {
  setTimeout(() => {
    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 0);
}

}
