import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LiquidatorApplicationService {
  private apiUrl = 'http://localhost:3000/api/liquidator'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  // Create a new application
  createApplication(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/application`, { user_id: userId });
  }

  // Get application by ID
  getApplication(user_id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/application/${user_id}`);
  }

  // Update a specific section in the application
  updateSection(applicationId: number, section: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/application/${applicationId}/section`, { section, data });
  }

  // Submit the application
  submitApplication(applicationId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/application/${applicationId}/submit`, {});
  }

  // Check application review status
  getReviewStatus(applicationId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/application/${applicationId}/status`);
  }

  getSectionDetails(applicationId: number, section: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/application/${applicationId}/section/${section}`);
  }

  editSection(personalInfoId: number, section: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/application/${personalInfoId}/edit-section`, {
      section,
      data,
    });
  }
  
  
}
