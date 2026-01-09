import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RoomService } from '../../core/services/rooms/room-service';
import { IRoom } from '../../shared/interfaces/iroom';

@Component({
  selector: 'app-details',
  imports: [ RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit {

  private readonly roomService = inject(RoomService);
  private readonly route = inject(ActivatedRoute);

  room!: IRoom;

  selectedImage!: string;

  ngOnInit(): void {
    const roomId = Number(this.route.snapshot.paramMap.get('roomId'));

    if (roomId) {
      this.getRoomDetails(roomId);
    }
  }

  changeImage(img: string) {
    this.selectedImage = img;
  }

  getRoomDetails(roomId: number) {
    this.roomService.getRoomById(roomId).subscribe({
      next: (res) => {
        console.log(res);
        this.room = res;
        this.selectedImage = this.room.images[0];
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
