import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RestService {
  private REST_API_SERVER: string = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  get<T>(path: string): Observable<T> {
    const url = this.REST_API_SERVER.concat(path);
    return this.http.get<T>(url);
  }

  post<T>(path: string, body: Record<string, string>): Observable<T> {
    const url = this.REST_API_SERVER.concat(path);
    return this.http.post<T>(url, body);
  }

  fileUpload<T>(path: string, file: File): Observable<T> {
    const url = this.REST_API_SERVER.concat(path);
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const headers = new HttpHeaders();
    return this.http.post<T>(url, formData, { headers });
  }
}
