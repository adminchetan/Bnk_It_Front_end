import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { Error404Component } from '../../errorPages/error404/error404.component';
import { DashboardComponentComponent } from '../components/dashboard-component/dashboard-component.component';
import { WelcomeComponent } from '../components/welcome/welcome.component';
import { ServicesComponentComponent } from '../components/services-component/services-component.component';
import { OrganizationComponentComponent } from '../components/organization-component/organization-component.component';
import { DomainDetailsComponentComponent } from '../components/domain-details-component/domain-details-component.component';
import { HostingDetailsComponentComponent } from '../components/hosting-details-component/hosting-details-component.component';
import { AdminRolesMapperComponent } from '../components/admin-roles-mapper/admin-roles-mapper.component';

const routes:Routes=[

  {path:'',component:DashboardComponentComponent,children:
    [
      {path:'',redirectTo:'welcome',pathMatch:'full'}, 
      {path:'AdminRoles',component:AdminRolesMapperComponent},
      {path:'welcome',component:WelcomeComponent},
      {path:'services',component:ServicesComponentComponent},
      {path:'org',component:OrganizationComponentComponent},
      {path:'Domains',component:DomainDetailsComponentComponent},
      {path:'Hosting',component:HostingDetailsComponentComponent},
      { path: '**', component: Error404Component } // Optional: Redirect unknown paths to home
    ]}
  ]
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class UserRoutesModule { }
