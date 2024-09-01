import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor() { }
  clearSession() 
  {
    localStorage.clear();
    console.log('Local storage cleared.');
  }

}
