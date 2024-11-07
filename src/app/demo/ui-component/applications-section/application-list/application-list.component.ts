import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [SharedModule,RouterModule ],
  templateUrl: './application-list.component.html',
  styleUrl: './application-list.component.scss'
})
export class ApplicationListComponent { 
  startDate: string | null = null;
  endDate: string | null = null;
  months:any[]=[];
  monthsNo:number;
  pdfSrc: string = '../../../../../assets/test.pdf'; 
  pdfSrcTax:string='../../../../../assets/test2.pdf';
  pdfScrBank:string='../../../../../assets/test3.pdf';
  selectedMonth:string='';
  attachmentNo:number=0;

  isLoading: boolean = true;

   // Loading states for each PDF
   loadingDoc = true;
   loadingTax = true;
   loadingBank = true;

  constructor(private route: ActivatedRoute,private modalService: NgbModal,private router: Router) { } 
 
  ngOnInit(): void { 
    this.route.queryParamMap.subscribe(params => {
      this.startDate = params.get('start'); // Get the user ID from the query parameters
      this.endDate = params.get('end'); // Get the user type from the query parameters

      console.log(this.startDate);
      console.log(this.endDate);
      this.months=this.getMonthsBetween(this.startDate, this.endDate);
      this.months=this.formatMonths(this.months);
      this.monthsNo=this.months.length
      this.attachmentNo=2;
      
    });
  } 

  onPdfLoaded(type: string) {
    if (type === 'doc') this.loadingDoc = false;
    if (type === 'tax') this.loadingTax = false;
    if (type === 'bank') this.loadingBank = false;
  }

  formatMonths(months: string[]): string[] {
    const readableMonths: string[] = [];

    // Iterate through each yyyy/mm string in the array
    months.forEach(monthStr => {
        const [year, month] = monthStr.split('/').map(Number); // Split and parse year and month
        const date = new Date(year, month - 1); // Create a date object (month is 0-based)
        
        // Format month to a readable format like "September 2023"
        const formatted = date.toLocaleString('default', { month: 'long', year: 'numeric' });
        readableMonths.push(formatted);
    });

    return readableMonths;
}
  getMonthsBetween(startDate: string, endDate: string): string[] {
    const result: string[] = [];

    // Parse the input dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Adjust the end date to include the last month if start and end are different
    end.setMonth(end.getMonth() + 1);

    // Loop through each month between the start and end dates
    const current = new Date(start);
    while (current < end) {
        // Format the current month as yyyy/mm
        const year = current.getFullYear();
        const month = (current.getMonth() + 1).toString().padStart(2, '0'); // Zero pad for month
        result.push(`${year}/${month}`);

        // Move to the next month
        current.setMonth(current.getMonth() + 1);
    }

    return result;
}

sortDates( order: 'asc' | 'desc' = 'asc'): string[] {
  return this.months.sort((a, b) => {
      // Convert strings to Date objects
      const dateA = new Date(a);
      const dateB = new Date(b);
      
      // Sort by comparing the timestamps
      if (order === 'asc') {
          return dateA.getTime() - dateB.getTime(); // Oldest to newest
      } else {
          return dateB.getTime() - dateA.getTime(); // Newest to oldest
      }
  });
}

open(content: any) {
  this.modalService.open(content, { windowClass: 'custom-xl-modal' }).result.then((result) => {
    console.log(`Closed with: ${result}`);
  }, (reason) => {
    console.log(`Dismissed with: ${reason}`);
  });
}
resetLoader(){
  this.loadingDoc = true;
  this.loadingTax = true;
  this.loadingBank = true;
}

back(){
  this.router.navigate(['/applications']).then(() => {
    window.location.reload();
  });
}
}
