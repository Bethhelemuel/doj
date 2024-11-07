import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // public props
  showApprovalStatus = false;
  navCollapsed: boolean;
  navCollapsedMob: boolean;

  // Map of route paths to selectors
  routeToSelectorMap = {
    '/liquidators': 'app-liquidators',
    '/track': 'app-track',
    '/applications': 'app-applications',
    '/application-list':'app-application-list',
    '/': 'app-default',
    // Add more routes and their corresponding selectors
  };

  // Store the last removed selector for replacement
  previousSelector: string | null = null;

  constructor(private router: Router) {
    // Listen to NavigationEnd events
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const activeRoutePath = event.urlAfterRedirects;
      const selector = this.getSelectorForRoute(activeRoutePath);

      if (selector) {
        if (this.previousSelector) {
          // Remove the previous element before adding a new one
          this.removeElementBySelector(this.previousSelector);
        }
        // Store the new selector as the previous one for the next route change
        this.previousSelector = selector;
        console.log('Current route selector:', selector);
        // Add the new selector (if necessary, e.g., re-rendering component)
        this.addElementBySelector(selector);
      } else {
        console.log('No selector found for route', activeRoutePath);
      }
    });
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log(event.url);
      // Handle specific route for approval status
      this.showApprovalStatus = event.url.includes('/approval-status');
    });
  }

  // Function to map route path to its component selector
  getSelectorForRoute(route: string): string {
    return this.routeToSelectorMap[route] || ''; // Return the associated selector or empty string
  }

  // Method to add an element by its selector (this would depend on how you want to add it)
  addElementBySelector(selector: string): void {
    // In case you want to append or manipulate the DOM with the new element
    console.log(`Adding element with selector: ${selector}`);
    // Depending on your requirements, you could manually trigger the component load or update here
  }

  // Function to remove the element by its selector name
  removeElementBySelector(selector: string): void {
    const element = document.querySelector(selector);
    if (element) {
      element.remove();
      console.log(`Element with selector '${selector}' removed.`);
    } else {
      console.log(`Element with selector '${selector}' not found.`);
    }
  }

  // Public methods for navigation behavior (same as before)
  navMobClick() {
    if (this.navCollapsedMob && !document.querySelector('app-navigation.pc-sidebar')?.classList.contains('mob-open')) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
    if (document.querySelector('app-navigation.pc-sidebar')?.classList.contains('navbar-collapsed')) {
      document.querySelector('app-navigation.pc-sidebar')?.classList.remove('navbar-collapsed');
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }

  closeMenu() {
    if (document.querySelector('app-navigation.pc-sidebar')?.classList.contains('mob-open')) {
      document.querySelector('app-navigation.pc-sidebar')?.classList.remove('mob-open');
    }
  }
}
