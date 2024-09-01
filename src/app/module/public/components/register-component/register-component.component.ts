import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiCallService } from '../../../users/services/api-call.service';
import { LoadingComponent } from '../../../common/animation/loading/loading.component';
import Swal from 'sweetalert2';
import { SweetalertsService } from '../../../common/swal/sweetalerts.service';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,LoadingComponent],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.css'
})
export class RegisterComponentComponent implements OnInit {
  isLoading=false;

  registrationForm: FormGroup;
  response: any;
  constructor(private fb: FormBuilder,private authService: ApiCallService,private swal:SweetalertsService) {
    this.registrationForm = this.fb.group(
      {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }
  onSubmit(): void {
    this.isLoading=true;

    if (this.registrationForm.valid) {
      const userData = {
        id: 0,
        email: this.registrationForm.value.email,
        mobileNumber: this.registrationForm.value.mobileNumber,
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
        password: this.registrationForm.value.password,
        currentUser: 'External'
      }
 
    this.authService.signUp(userData).subscribe(
      res => {
        this.response = res;
        console.log('Response:', res);
        this.swal.showAlert(res.alerts,res.alerts,res.message);
        this.isLoading=false;
      },
      err => {
        console.error('Error:', err);
        this.swal.showAlert("error",err.alerts,err.message);
        this.isLoading=false;
      }
    );
   }

      
   else{

    this.isLoading=false;
    this.swal.showAlert("error","error","Please fill the complete RegistrationForm");
  }
}}