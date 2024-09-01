import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  private apiUrl = 'https://localhost:7057/api/';
  constructor(private http: HttpClient) { }

//***************************USerAuthRelated************************ */

signUp(userData: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.post<any>(this.apiUrl+'Auth/SignUp', userData, { headers });
}

signIn(userData: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.post<any>(this.apiUrl+'Auth/SingIn', userData, { headers });
}

//***************************USerAuthRelated************************ */



//*************************ServicesController*************************//
getAllUserSubscribedServices(): Observable<any> {
    return this.http.get<any>(this.apiUrl+"Services/GetAllServices")
      .pipe(
        catchError((error) => {
          console.error('Error fetching services:', error);
          throw error; // You can handle errors here or rethrow
        })
      );
  }
//*************************ServicesController*************************//








//*************************ClientController*************************//
  getClientInformation():Observable<any>{
    return this.http.get<any>(this.apiUrl+"Client/GetClientInformation")
    .pipe(
      catchError((error)=>{
        console.error('Error Retriving Client Information',error);
        throw error;
      })
    );
  }
  //*************************ClientController*************************//







  //*************************ServerController*************************//
  

  getServerDetails(): Observable<any> {
    return this.http.get<any>(this.apiUrl+"Server/GetBasicServerDetailsOfUser")
      .pipe(
        catchError((error) => {
          console.error('Error fetching services:', error);
          throw error; 
        })
      );
  }


  getDomainsDetails():Observable<any>{
  return this.http.get<any>(this.apiUrl+"Server/GetDomainDetails").pipe(
    catchError((error)=>{
      console.error(error);
      throw error;
    })
  )}

  getCompleteHostingDetailsOfUser():Observable<any>{
    return this.http.get<any>(this.apiUrl+"Server/getCompleteHostingDetailsOfUser").pipe(
      catchError((error)=>{
        console.error(error);
        throw error;
      })
    )}
  


    getCompleteDomainDetailsOfUser():Observable<any>{
      return this.http.get<any>(this.apiUrl+"Server/getCompleteDomainDetailsOfUser").pipe(
        catchError((error)=>{
          console.error(error);
          throw error;
        })
      )}

    //*************************ServerController*************************//



    //******************************Admin API's**************************** */
    AdminGetAllUsers(): Observable<any> {
      return this.http.get<any>(this.apiUrl+'Admin/GetAllUserList');
    }

    AdmingetColumnNames(): Observable<string[]> {
          return this.http.get<{ data: string[] }>(this.apiUrl+'Admin/GettAllColumsofroles').pipe(
          map(response => response.data));// if we have only key not data
    }

    getRolesById(userid:any): Observable<any> {
      const action ='Admin/GetRolesById?userid='+userid;
      return this.http.get<any>(this.apiUrl+action);
    }

      updateRolesByID(UpdatedRolesdata:any):Observable<any>
      {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
      
        return this.http.post<any>(this.apiUrl+'Admin/UpdateRolesById', UpdatedRolesdata, { headers });
      }

    //*******************************Admin API's**************************** */
}
