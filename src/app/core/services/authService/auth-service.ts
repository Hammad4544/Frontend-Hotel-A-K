import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    
    private readonly httpClient = inject(HttpClient);
    private readonly router = inject(Router);

    

   
    sendRegisterForm(data: object):Observable<any>
     {
        return this.httpClient.post(`${environment.baseUrl}/api/Auth/register`, data); 
     }

     sendLoginForm(data: object):Observable<any>
     {
        return this.httpClient.post(`${environment.baseUrl}/api/Auth/login`, data); 
     }

   
     
   }

