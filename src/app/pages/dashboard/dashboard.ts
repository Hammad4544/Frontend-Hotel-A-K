import { AfterViewInit, Component, inject, Inject, OnInit, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser, CommonModule, NgClass } from '@angular/common'; 
import { Chart, registerables } from 'chart.js'; 
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { BookingService } from '../../core/services/bookingService/booking-service';
import { IStats } from '../../shared/interfaces/IStats';
import { IAllLatestBooking } from '../../shared/interfaces/IALlLatestBooking';

// تسجيل مكونات Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit, AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly bookingService = inject(BookingService);

  // تخزين مثيلات الرسم البياني لمنع التكرار وخراب الشكل
  private bookingChart: Chart | undefined;
  private revenueBar: Chart | undefined;
  private revenuePie: Chart | undefined;

  stats: IStats = {
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
    // التأكد أننا في المتصفح قبل تشغيل Chart.js
    if (isPlatformBrowser(this.platformId)) {
      // استخدام setTimeout بسيط لضمان رندر العناصر في الـ DOM
      setTimeout(() => {
        this.createBookingChart();
        this.createRevenueBar();
        this.createRevenuePie();
      }, 50);
    }
  }

  // تنظيف الرسوم البيانية عند الخروج من الصفحة لتوفير الذاكرة
  ngOnDestroy() {
    this.bookingChart?.destroy();
    this.revenueBar?.destroy();
    this.revenuePie?.destroy();
  }

  // --- الرسوم البيانية ---

  createBookingChart() {
    const canvas = document.getElementById('bookingChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    const blueGradient = ctx.createLinearGradient(0, 0, 0, 300);
    blueGradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)'); 
    blueGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    this.bookingChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Online Bookings',
            data: [65, 80, 78, 90, 95, 110, 125],
            borderColor: '#3b82f6',
            borderWidth: 3,
            backgroundColor: blueGradient, 
            fill: true,
            tension: 0.4, 
            pointRadius: 4,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#3b82f6',
            pointBorderWidth: 2,
          },
          {
            label: 'Offline Bookings',
            data: [60, 70, 72, 85, 88, 100, 115],
            borderColor: '#93c5fd',
            borderDash: [5, 5],
            fill: false,
            tension: 0.4,
            pointRadius: 0,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // يمنع الرسمة من الخروج عن الـ Container
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { 
            beginAtZero: true,
            grid: { color: '#f3f4f6' },
            ticks: { stepSize: 20 } 
          }
        }
      }
    });
  }

  createRevenueBar() {
    const canvas = document.getElementById('revenueBar') as HTMLCanvasElement;
    if (!canvas) return;

    this.revenueBar = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun'],
        datasets: [{
          data: [20, 25, 35, 40, 48],
          backgroundColor: '#065f46', 
          borderRadius: 6,
          barThickness: 12
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
            beginAtZero: true,
            grid: { color: '#f3f4f6' },
            ticks: { font: { size: 10 }, stepSize: 10 } 
          }
        }
      }
    });
  }

  createRevenuePie() {
    const canvas = document.getElementById('revenuePie') as HTMLCanvasElement;
    if (!canvas) return;

    this.revenuePie = new Chart(canvas, {
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
        layout: { padding: 10 },
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

  // --- جلب البيانات من الـ Service ---

  getStats() {
    this.bookingService.getBookingStats().subscribe({
      next: (res) => {
        this.stats = res;
      },  
      error: (err) => console.error('Stats Error:', err)
    });
  }

  getAllLatestBooking() {
    this.bookingService.getAllLatestBookingsAdmin().subscribe({
      next: (res) => {
        this.AllLatestBooking = res;
      },  
      error: (err) => console.error('Latest Bookings Error:', err)
    });
  }
}