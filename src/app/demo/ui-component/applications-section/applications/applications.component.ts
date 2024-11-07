import { Component } from '@angular/core';
import { SharedModule } from "../../../../theme/shared/shared.module";

import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/draggable';
import { Calendar, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent {
  calendar: Calendar | undefined;
  lastAddedEvent: EventApi | null = null; // Track the last added event

  customStartDate: Date | null = null; // Custom start date
  customEndDate: Date | null = null; // Custom end date

  startDate:Date;
  endDate:Date;
  constructor(private router: Router) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();

    

    const calendarEl: HTMLElement = document.getElementById('calendar')!;
    this.calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      editable: false,
      droppable: false,
      displayEventTime:false,
      selectable: false,
      headerToolbar: {  
        left: 'title',
        center: 'dayGridDay,dayGridWeek,dayGridMonth',
        right: 'prev,next today', 
      }, 
      events: [
        { title: '103 Application', start: new Date(y, m, 1), url: 'application-list?start='+this.formatDate(new Date(y, m, 1))+'&end='+this.formatDate(new Date(y, m, 1)), className: 'success' },
        { title: '22 Application', start: new Date(y, m, 6), url: 'application-list?start='+this.formatDate(new Date(y, m, 6))+'&end='+this.formatDate(new Date(y, m, 6)), className: 'info' },
        // { title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), className: 'info' },
  
        // { title: 'LIQUIDATORS', start: new Date(y, m, d, 10, 30), className: 'important' },
        // { title: 'LIQUIDATORS', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), className: 'important' },
        // { title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30) },
        // { title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/', className: 'success' },
      ],
      select: (info) => {
        const title = prompt('Event Title:');
        if (title) {
          this.addCalendarEvent(title, info.start, info.end);
        }
        this.calendar.unselect();
      },
    });

    this.calendar.render();
    this.setToday();
  }

  // Function to add a calendar event programmatically
  addCalendarEvent(title: string, start: Date, end: Date): void {
    // Remove the last event if it exists
    if (this.lastAddedEvent) {
      this.lastAddedEvent.remove();
    }

    // Add the new event and store the reference
    if (this.calendar) {
      this.lastAddedEvent = this.calendar.addEvent({
        title,
        start,
        end,
        allDay: true,
        color:'#F47F0C', 
      });
    }
  }

    // Functions for each button's date range
    setToday(): void {
      const today = new Date();
      this.addCalendarEvent('Today', today, today);
      this.startDate=today;
      this.endDate=today;
    }
  
    setYesterday(): void {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      this.addCalendarEvent('Yesterday', yesterday, yesterday);
      this.startDate=yesterday;
      this.endDate=yesterday;
    }
  
    setLast7Days(): void {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 6); // last 7 days including today
      this.addCalendarEvent('Last 7 Days', start, end);

      this.startDate=start;
      this.endDate=end;
    }
  
    setLast30Days(): void {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - 29); // last 30 days including today
      this.addCalendarEvent('Last 30 Days', start, end);

      this.startDate=start;
      this.endDate=end;
    }
  
    setLast3Months(): void {
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 3);
      this.addCalendarEvent('Last 3 Months', start, end);

      this.startDate=start;
      this.endDate=end;
    }
  
    setLast6Months(): void {
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 6);
      this.addCalendarEvent('Last 6 Months', start, end);

      this.startDate=start;
      this.endDate=end;
    }
  
    setLastYear(): void {
      const end = new Date();
      const start = new Date();
      start.setFullYear(start.getFullYear() - 1);
      this.addCalendarEvent('Last Year', start, end);

      this.startDate=start;
      this.endDate=end;
    }
  
    setThisYear(): void {
      const start = new Date(new Date().getFullYear(), 0, 1); // January 1st of the current year
      const end = new Date(); // Today
      this.addCalendarEvent('This Year', start, end);

      this.startDate=start;
      this.endDate=end;
    }

      // Custom date range function
  setCustomDateRange(): void {
    if (this.customStartDate && this.customEndDate) {
      this.addCalendarEvent('Custom Date Range', this.customStartDate, this.customEndDate);
      this.startDate=this.convertStringToDate(this.customStartDate.toString());
      this.endDate=this.convertStringToDate(this.customEndDate.toString());
    } else {
      alert('Please select both start and end dates.');
    }
  }

  convertStringToDate(dateString: string): Date | null {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}/${month}/${day}`;
  } 

  search(){ 
   
    if(this.isDateNotEmpty(this.startDate) || this.isDateNotEmpty(this.endDate)){
      if(this.startDate <= this.endDate){
        var start=this.formatDate(this.startDate);
        var end=this.formatDate(this.endDate);
        this.router.navigate(['/application-list'], { queryParams: { start: start, end: end } }).then(() => {
          window.location.reload();
        });;
       
      }

    }


  }
  isDateNotEmpty(date: Date | null | undefined): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }
}

