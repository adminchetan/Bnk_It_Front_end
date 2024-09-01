import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SweetalertsService {

  constructor() { }
  
showAlert(icon: 'success' | 'error' | 'warning' | 'info', title: string, text: string): void {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    confirmButtonText: 'OK'
  });
}
}
