import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  constructor(private httpClient: HttpClient,private tokenStorage: TokenStorageService) { }

  user: any = this.tokenStorage.getUser()
  // post(data:any) : Observable<any>{
  //   const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
  //   return this.httpClient.post(`${baseUrl}/parkings`,data,config);
  // }

  get() : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.get(`${baseUrl}/clientparking/${this.tokenStorage.getUser().Entreprise.id}`,config);
  }


  getoption() : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.get(`${baseUrl}/option/parking/${this.tokenStorage.getUser().Entreprise.id}`,config);
  }

  getent() : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.get(`${baseUrl}/option/entreprise`,config);
  }

  // getById(id:any) : Observable<any>{
  //   const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
  //   return this.httpClient.get(`${baseUrl}/parkings/`+id ,config);
  // }

  // put(id:any, data:any) : Observable<any>{
  //   const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
  //   return this.httpClient.put(`${baseUrl}/parkings/`+id,data,config);
  // }


  // delete(id:any) : Observable<any>{
  //   const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
  //   return this.httpClient.delete(`${baseUrl}/parkings/`+id ,config);
  // }
}
