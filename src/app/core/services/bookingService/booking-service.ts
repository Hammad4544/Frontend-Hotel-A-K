import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IBookingRequest } from '../../../shared/interfaces/ibooking-request';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {

  private readonly httpClient = inject(HttpClient);


  CreateBookingForUser(data: IBookingRequest): Observable<any>
  {
    return this.httpClient.post(`${environment.baseUrl}/api/Booking`, data);
  }

  getBookingsByRoomId(roomId: number): Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/Booking/room/${roomId}`);
  }
  
  getAllBooking(): Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/Booking`);
  }
  
  updateBookingsByRoomId(roomId: number , data :object): Observable<any>
  {
    return this.httpClient.put(`${environment.baseUrl}/api/Booking/${roomId}` , data);
  }
  
  deleteBookingsByRoomId(roomId: number): Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/Booking/${roomId}`);
  }
  
}
