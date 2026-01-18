import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BookingService } from '../../core/services/bookingService/booking-service';
import { IgetAllBooking } from '../../shared/interfaces/iget-all-booking';
import { CommonModule, CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../core/services/authService/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  imports: [DatePipe , CurrencyPipe , CommonModule],
  templateUrl: './booking.html',
  styleUrl: './booking.scss',
})
export class Booking implements OnInit {
  private readonly bookingService = inject(BookingService);
  private readonly authService = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);
    private readonly router = inject(Router);


  bookingList: IgetAllBooking[] = [];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('userToken');
      const userId = this.authService.getUserIdFromToken();
    if (userId) {
        this.getAllBookingsForUser(userId);
      }
    }
  }

  getAllBookingsForUser(userId: string): void {
    this.bookingService.getAllBooking().subscribe({
      next: (res: IgetAllBooking[]) => {
        this.bookingList = res.filter((b :IgetAllBooking) => b.userId === userId);
        console.log('User bookings:', this.bookingList);
      },
      error: (err) => console.error(err)
    });
  }

  onPay(bookingId: number | string): void {
    console.log(bookingId);
    this.router.navigate(['/payment']);

  }

  getTotalPrice(checkInDate: Date, checkOutDate: Date, pricePerNight: number): number {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    return diffDays * pricePerNight;
  }

  removeBooking(bookingId :number): void { };

  updateBooking(bookingId :number): void { };
  

    
}
