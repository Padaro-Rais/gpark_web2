import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServivesService {
  constructor(private http:HttpClient) { }
  login(data: any):Observable<any>{
    return this.http.post(`${baseUrl}/login`,data);
  }
}
