import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <header class="header header-6" id="header">
      <div class="branding">
        <a href="..." class="nav-link">
          <!-- <clr-icon shape="my-custom-shape"></clr-icon> -->
          <span class="title" id="app-name">ARCHLIK</span>
        </a>
      </div>
      <div class="header-nav">
        <a
          routerLink="/app/dashbord"
          routerLinkActive="active"
          class="nav-link nav-text"
        >
          <span>TABLEAU DE BORD</span>
        </a>
      </div>

      <div class="header-actions hide-for-print">
        <clr-dropdown>
          <button
            class="nav-text"
            clrDropdownTrigger
            aria-label="open user profile"
          >
            Admin, Master
            <clr-icon shape="caret down"></clr-icon>
          </button>
          <clr-dropdown-menu *clrIfOpen clrPosition="bottom-left">
            <a
              routerLink="/app/profile"
              clrDropdownItem
              *ngIf="true"
              id="profil"
            >
              Mon Profil
            </a>
            <a href="..." clrDropdownItem *ngIf="false">Preferences</a>
            <a (click)="logout()" clrDropdownItem id="profil">
              Se Déconnecter
            </a>
          </clr-dropdown-menu>
        </clr-dropdown>
        <!-- Add modules loader -->
        <!-- <app-app-modules [ressourcePath]='modulesBackendRoute'></app-app-modules> -->
      </div>
    </header>
  `,
  styles: [],
})
export class HeaderComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {}

  logout() {
    localStorage.clear();
    this.route.navigateByUrl('/auth/login');
  }
}
