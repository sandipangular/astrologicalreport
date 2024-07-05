import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getData(input_digit: string): Observable<any> {
    const formData = 'input_digit'+ '=' + input_digit;
    return this.http.post(this.apiUrl, formData);
  }
}
