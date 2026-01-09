import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
  
export class RoomService {
  private readonly httpClient = inject(HttpClient);

  getAllRooms(): Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}/api/Room/GetAll`);
  }
  
  getRoomById(roomId : number): Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/Room/GetRoomById/${roomId}`);
  }
  
}
