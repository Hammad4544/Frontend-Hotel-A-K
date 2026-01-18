import { AfterViewInit, Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; 
import { Chart } from 'chart.js/auto'; 
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BookingService } from '../../core/services/bookingService/booking-service';
import { IStats } from '../../shared/interfaces/IStats';
import { IAllLatestBooking } from '../../shared/interfaces/IALlLatestBooking';
import { CommonModule, NgClass } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  imports: [NgClass,CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { };

  private readonly BookingService = inject(BookingService);

  stats:IStats = {
    "totalBookings": 0,
    "rooms": 0,
    "users": 0,
    "revenue": 0
  };
  AllLatestBooking: IAllLatestBooking[] = [];
    
  ngOnInit(): void {
    this.getStats();
    this.getAllLatestBooking();
  }

  

 ngAfterViewInit() {
    
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.createBookingChart();
        this.createRevenueBar();
        this.createRevenuePie();
      }, 50);
    }
  }

 // Booking Overview
createBookingChart() {
  const ctx = document.getElementById('bookingChart') as HTMLCanvasElement;
  const chartCtx = ctx.getContext('2d')!;

  
  const blueGradient = chartCtx.createLinearGradient(0, 0, 0, 300);
  blueGradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)'); 
  blueGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Jun', 'Mar', 'Apr', 'May', 'Jun', 'Jun'],
      datasets: [
        {
          label: 'Online Bookings',
          data: [65, 80, 78, 90, 95, 110, 125],
          borderColor: '#3b82f6',
          borderWidth: 3,
          backgroundColor: blueGradient, 
          fill: true,
          tension: 0.45, 
          pointRadius: 4,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#3b82f6',
          pointBorderWidth: 2,
        },
        {
          label: 'Offline Bookings',
          data: [60, 70, 72, 85, 88, 100, 115],
          borderColor: '#93c5fd',
          borderDash: [5, 5], // الخط المقطع
          fill: false,
          tension: 0.45,
          pointRadius: 0,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, border: { display: false } },
        y: { grid: { color: '#f3f4f6' }, border: { display: false }, ticks: { stepSize: 20 } }
      }
    }
  });
}

// Revenue Bar & Pie
createRevenueBar() {
  new Chart('revenueBar', {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun'],
      datasets: [{
        data: [20, 25, 35, 40, 48],
        backgroundColor: '#065f46', 
        borderRadius: 4,
        barThickness: 15
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { 
          grid: { display: false }, 
          ticks: { font: { size: 10, weight: 'bold' }, color: '#9ca3af' } 
        },
        y: { 
          grid: { color: '#f3f4f6' },
          border: { display: false },
          ticks: { font: { size: 10 }, stepSize: 10 } 
        }
      }
    }
  });
}

createRevenuePie() {
  new Chart('revenuePie', {
    type: 'pie',
    plugins: [ChartDataLabels],
    data: {
      datasets: [{
        data: [40, 25, 15, 20], 
        backgroundColor: ['#1e40af', '#b45309', '#065f46', '#93c5fd'],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 20 
      },
      plugins: {
        legend: { display: false },
        datalabels: {
          color: '#fff',
          font: { weight: 'bold', size: 11 },
          formatter: (value) => value + '%' 
        }
      }
    }
  });
}
  

getStats() {
this.BookingService.getBookingStats().subscribe({
  next: (res) => {
    console.log(res);
    this.stats = res;
  },  
  error: (err) => {
    console.log(err);
  }
})  
}
  
getAllLatestBooking() {

  this.BookingService.getAllLatestBookingsAdmin().subscribe({
    next: (res) => {
      console.log(res);
      this.AllLatestBooking = res;
    },  
    error: (err) => {
      console.log(err);
    }})
}  
}
