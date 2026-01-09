import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RoomService } from '../../core/services/rooms/room-service';
import { IRoom } from '../../shared/interfaces/iroom';

@Component({
  selector: 'app-home',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  

  private readonly roomService = inject(RoomService);
  private readonly router = inject(Router);



  RoomsList: IRoom[] = [];

  getRoomsData(): void{
    this.roomService.getAllRooms().subscribe({
      next: (res) => {
        console.log(res);
        this.RoomsList = res;
      },  
      error: (err) => {
        console.log(err);
      }
   })
  }
  getByID(roomId: number) {
         this.router.navigate(['/details', roomId]);
        
      
  }

  ngOnInit(): void {
    this.getRoomsData();
  }

}
