import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponentComponent } from '../components/home-component/home-component.component';
import { ProductsComponentComponent } from '../components/products-component/products-component.component';
import { IndexComponent } from '../components/index/index.component';
import { LoginComponentComponent } from '../components/login-component/login-component.component';
import { RegisterComponentComponent } from '../components/register-component/register-component.component';
import { PasswordresetComponentComponent } from '../components/passwordreset-component/passwordreset-component.component';
const routes: Routes=[
  {
    path:'',component:IndexComponent,children:[
    {path:'',redirectTo:'Home',pathMatch:'full'}, 
    {path:'Home',component:HomeComponentComponent},
    {path:'SignIn', component:LoginComponentComponent},
    {path:'SignUp',component:RegisterComponentComponent},
    {path:'ResetPassword',component:PasswordresetComponentComponent},
    {path:'Products',component:ProductsComponentComponent}

  ]}]
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class PublicRoutesModule { }
