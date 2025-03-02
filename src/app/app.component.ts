// angular import
import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // public props
  showApprovalStatus = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void { 

    // Listen for the NavigationEnd event to get the final URL
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(event.url) 
        // Check if the URL matches /approval-status
        this.showApprovalStatus = event.url.includes('/approval-status')  ;
      //  window.location.reload();
      }
    });
   
  }
}
