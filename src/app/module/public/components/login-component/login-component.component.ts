import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { LoadingComponent } from '../../../common/animation/loading/loading.component';
import { SweetalertsService } from '../../../common/swal/sweetalerts.service';
import { ApiCallService } from '../../../users/services/api-call.service';
@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [RouterModule,
    FormsModule,CommonModule,
    MatFormFieldModule,MatInputModule,
    MatButtonModule,ReactiveFormsModule,LoadingComponent],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent {
  loginForm: FormGroup;
  response:any;
  isLoading=false;
  constructor(private fb: FormBuilder, private swal:SweetalertsService,private authService: ApiCallService,private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {}

  onSubmit(): void {

    this.isLoading =true;
    if (this.loginForm.valid) 
    {
      const userData={
        username:this.loginForm.value.username,
        password:this.loginForm.value.password,
        currentUser: 'External'
      }

      this.authService.signIn(userData).subscribe( 
        res=>{
          console.log(res);
          localStorage.setItem("token",res.token);
          localStorage.setItem("userDisplayName",res.userDisplayName);
          localStorage.setItem("userId",res.userId);
          localStorage.setItem("assignedRoles", res.asignedRole);
          if(res.success)
            {
              this.router.navigateByUrl('/Dashboard');
            }
         
          this.swal.showAlert(res.alerts,res.alerts,res.message);
          this.isLoading=false;

        },
        err=>{
          console.error('Error:', err);
          this.swal.showAlert("error",err.alerts,"Server Downtime or your internet connection Too slow");
          this.isLoading=false;

        });

    }

    else{

      this.swal.showAlert("info","Information","Please fill all the fields of login form");
      this.isLoading =false;
    }
  }


 // ----------------------------------------------------------SWAL for Arya list values check-----------------------------------------------------------//
 swalfire(type: string, attribute: string): boolean {
  if (type == 'success') {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Login Sccess',
      confirmButtonText: 'OK'
    });
    return true;
  } else if (type == 'warning') {
    Swal.fire({
      icon: 'warning',
      title: 'Validation Error',
      text: 'Please fill all the fileds',
      confirmButtonText: 'OK'
    });
    return false;
  } else if (type == 'error') {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Please Check Your internet connection',
      confirmButtonText: 'OK'
    });
    return false;
  } else {
    return false;
  }
}

showAlert(icon: 'success' | 'error' | 'warning' | 'info', title: string, text: string): void {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    confirmButtonText: 'OK'
  });
}


}
