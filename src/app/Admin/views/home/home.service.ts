import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  getDatat(){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.get(`${baseUrl}/statistique`,config);
  }

  getDataS1(){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.get(`${baseUrl}/statistiques`,config);
  }

  getDataS2(){
    const config = { headers: {Authorization: "Bearer "+localStorage.getItem('token')} };
    return this.httpClient.get(`${baseUrl}/statistiques2`,config);
  }
}
