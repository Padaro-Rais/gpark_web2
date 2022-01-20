import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { TokenStorageService } from '../../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TypeContainerService {

  constructor(private httpClient: HttpClient,private tokenStorage: TokenStorageService) { }

  post(data:any) : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.post(`${baseUrl}/typecontainers`,data,config);
  }

  get() : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.get(`${baseUrl}/typecontainers`,config);
  }

  getById(id:any) : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.get(`${baseUrl}/typecontainers/`+id ,config);
  }

  put(id:any, data:any) : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.put(`${baseUrl}/typecontainers/`+id,data,config);
  }


  delete(id:any) : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.delete(`${baseUrl}/typecontainers/`+id ,config);
  }

}
