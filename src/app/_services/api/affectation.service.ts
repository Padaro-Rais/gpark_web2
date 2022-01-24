import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  constructor(private httpClient: HttpClient,private tokenStorage: TokenStorageService) { }

  post(data:any) : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.post(`${baseUrl}/entrepriseparking`,data,config);
  }

  get() : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.get(`${baseUrl}/entrepriseparking`,config);
  }


  delete(id:any) : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.delete(`${baseUrl}/entrepriseparking/`+id ,config);
  }
}
