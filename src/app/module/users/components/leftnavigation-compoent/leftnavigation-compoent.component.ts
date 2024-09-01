import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LogoutService } from '../../../common/Logout/logout.service';
import { roleManagerConstants } from '../../../common/Roles/roleManagerConstants';
// Interface defining the structure of menus object

@Component({
  selector: 'app-leftnavigation-compoent',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './leftnavigation-compoent.component.html',
  styleUrl: './leftnavigation-compoent.component.css'
})
export class LeftnavigationCompoentComponent {
  menu: any = []
  rolesfromdatabase: string = '';
  filteredMenus: any[] = [];
  @Input() isActive: boolean = false;

  constructor(private logout: LogoutService, private router: Router) {


    this.menu = roleManagerConstants.menus;
    const userRoles = localStorage.getItem("assignedRoles");
    const jsonString = `[${userRoles}]`;
    if (userRoles != null) {
      this.rolesfromdatabase = JSON.parse(jsonString);
    }
    for (let i = 0; i < this.rolesfromdatabase.length; i++) {

      this.menu.forEach((element: any) => {
        const isRolePresent = element.roles.find((role: any) => role == this.rolesfromdatabase[i]);// check if the role is presentor not

        if (isRolePresent != undefined) {
          this.filteredMenus.push(element);
        }
      });

     
    }
    console.log(this.filteredMenus);
  }
  toggleMenu() {
    this.isActive = !this.isActive;
  }

  Signout() {
    this.logout.clearSession();
    this.router.navigateByUrl('/Dashboard');
  }
}
