import { Component } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { error } from 'node:console';
interface User {
  id: number;
  serachString: string;
}
@Component({
  selector: 'app-admin-roles-mapper',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-roles-mapper.component.html',
  styleUrl: './admin-roles-mapper.component.css'
})
export class AdminRolesMapperComponent {
  users: User[] = [];
  selectedUser: User | undefined;


  roleData: any;


  Tablecolumns: string[] = [];
  constructor(private apiService:ApiCallService) 
  {}

  ngOnInit(): void 
  {
    this.apiService.AdminGetAllUsers().subscribe(response => {
      if (response && Array.isArray(response.data)) {
        this.users = response.data;
      } else {
        console.error('Unexpected response format:', response);
      }
    });

    this.apiService.AdmingetColumnNames().subscribe(data=>{
      this.Tablecolumns=data;
      console.log(this.Tablecolumns);
    });
  
  }

onUserSelect(event: Event): void {
  this.roleData = null;
  const selectElement = event.target as HTMLSelectElement;
  const userId = Number(selectElement.value);
  this.selectedUser = this.users.find(user => user.id === userId);
  console.log('Selected User:', userId);

  this.getUserCurrentRoles(userId);
}

getUserCurrentRoles(userid:any){

  this.apiService.getRolesById(userid).subscribe(data => {
    this.roleData = data.data;
  }, error => {
    console.error('Error fetching role data', error);
  });
}

onSaveClick(){
  console.log(this.roleData);
  this.apiService.updateRolesByID(this.roleData).subscribe(data=>{

  },
  error=>{
    console.log(error);
  }
);
}

}
