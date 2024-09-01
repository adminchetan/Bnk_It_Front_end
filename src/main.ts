import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HomeComponentComponent } from './app/module/public/components/home-component/home-component.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
