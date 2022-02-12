import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-seadbar',
  templateUrl: './seadbar.component.html',
  styles: [],
})
export class SeadbarComponent implements OnInit {
  constructor( private tokenStorage: TokenStorageService) { }

  permission: boolean = false;

  client: boolean = true;


  ngOnInit(): void {
    if (this.tokenStorage.getUser().Entreprise.role === '1') {
      this.permission = true;
      this.client = false;
    }

   console.log('role'+this.tokenStorage.getUser().Entreprise.role)
  }
}
