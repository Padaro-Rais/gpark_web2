import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient: HttpClient,private tokenStorage: TokenStorageService) { }

  getData(){
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.get(`${baseUrl}/transactions`,config);
  }

  post(data:any) : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.post(`${baseUrl}/transactions`,data,config);
  }

  get() : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.get(`${baseUrl}/transactions`,config);
  }

  getById(id:any) : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.get(`${baseUrl}/transactions/`+id ,config);
  }

  put(id:any, data:any) : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.put(`${baseUrl}/transactions/`+id,data,config);
  }


  delete(id:any) : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.delete(`${baseUrl}/transactions/`+id ,config);
  }
}
