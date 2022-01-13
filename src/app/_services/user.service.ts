import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { baseUrl } from 'src/environments/environment';

const API_URL = 'http://127.0.0.1:8000/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient,private tokenStorage: TokenStorageService) { }

  getData(): Observable<any> {
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.get(baseUrl + '/users', config);
  }
  

  // getUserBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'user', { responseType: 'text' });
  // }

  // getModeratorBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'mod', { responseType: 'text' });
  // }

  // getAdminBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'admin', { responseType: 'text' });
  // }
}
