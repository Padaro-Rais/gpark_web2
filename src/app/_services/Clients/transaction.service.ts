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

  user: any = this.tokenStorage.getUser()
  // post(data:any) : Observable<any>{
  //   const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
  //   return this.httpClient.post(`${baseUrl}/parkings`,data,config);
  // }

  get() : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.get(`${baseUrl}/clienttransaction/${this.user.Entreprise.id}`,config);
  }
}
