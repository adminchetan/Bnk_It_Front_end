import { Routes } from '@angular/router';
import { HomeComponentComponent } from './module/public/components/home-component/home-component.component';
import { ProductsComponentComponent } from './module/public/components/products-component/products-component.component';
import { Error404Component } from './module/errorPages/error404/error404.component';
import { DashboardComponentComponent } from './module/users/components/dashboard-component/dashboard-component.component';

export const routes: Routes = [
    
    
    {path:'',redirectTo:'Index',pathMatch:'full'}, 
  
    //when user is not logged in
  
    {path:'Index',loadChildren:()=>import('./module/public/public.module').then((m) => m.PublicModule),},
   
   
    // once user logged in 
    {path:'Dashboard',loadChildren:()=>import('./module/users/users.module').then((m) => m.UsersModule),},
  
    {path:'**',component:Error404Component}

        

];
