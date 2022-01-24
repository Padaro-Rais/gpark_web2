import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';
import { TokenStorageService } from '../token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private httpClient: HttpClient,private tokenStorage: TokenStorageService) { }


  user: any = this.tokenStorage.getUser()
  // post(data:any) : Observable<any>{
  //   const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
  //   return this.httpClient.post(`${baseUrl}/parkings`,data,config);
  // }

  get() : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.get(`${baseUrl}/clientagent/${this.user.Entreprise.id}`,config);
  }

  post(data:any) : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.post(`${baseUrl}/agents`,data,config);
  }

  getById(id:any) : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.get(`${baseUrl}/agents/`+id ,config);
  }

  put(id:any, data:any) : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.put(`${baseUrl}/agents/`+id,data,config);
  }


  delete(id:any) : Observable<any>{
    const config = { headers: {Authorization: "Bearer "+this.tokenStorage.getToken()} };
    return this.httpClient.delete(`${baseUrl}/agents/`+id ,config);
  }
}
