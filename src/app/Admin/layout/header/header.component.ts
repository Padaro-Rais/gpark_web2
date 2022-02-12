import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  constructor(private route: Router, private tokenStorage: TokenStorageService) {}


  user: any = this.tokenStorage.getUser()

  ngOnInit(): void {
    this.user = this.user.Entreprise.name+" "+ this.user.Entreprise.matricule;
  }



  logout() {
    sessionStorage.clear();
    this.route.navigateByUrl('/auth/login');
  }
}
