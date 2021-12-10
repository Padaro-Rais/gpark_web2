import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seadbar',
  template: `
    <!-- <a
      clrVerticalNavLink
      routerLinkActive="active"
      routerLink="/app/statistiques"
    >
      <clr-icon shape="pie-chart" clrVerticalNavIcon></clr-icon>
      <span class="sib_items">Statistiques</span>
    </a> -->

    <a
      class="nav-link ng-star-inserted"
      clrVerticalNavLink
      routerLink="/app/dashbord"
      routerLinkActive="active"
    >
      <clr-icon
        clrverticalnavicon
        role="none"
        shape="home"
        size="30"
      ></clr-icon>
      <span class="nav-text"> TABLEAU DE BORD </span>
    </a>

    <a
      class="nav-link ng-star-inserted"
      clrVerticalNavLink
      routerLink="/app/materials"
      routerLinkActive="active"
    >
      <clr-icon
        clrverticalnavicon
        role="none"
        shape="container"
        size="30"
      ></clr-icon>
      <span class="nav-text"> CONTENAIRES </span>
    </a>

    <a
      class="nav-link ng-star-inserted"
      clrVerticalNavLink
      routerLink="/app/materials"
      routerLinkActive="active"
    >
      <clr-icon
        clrverticalnavicon
        role="none"
        shape="directory"
        size="30"
      ></clr-icon>
      <span class="nav-text"> DOSSIERS </span>
    </a>

    <a
      class="nav-link ng-star-inserted"
      clrVerticalNavLink
      routerLink="/app/materials"
      routerLinkActive="active"
    >
      <clr-icon
        clrverticalnavicon
        role="none"
        shape="document"
        size="30"
      ></clr-icon>
      <span class="nav-text"> FICHIERS </span>
    </a>

    <a
      class="nav-link ng-star-inserted"
      clrVerticalNavLink
      routerLink="/app/materials"
      routerLinkActive="active"
    >
      <clr-icon
        clrverticalnavicon
        role="none"
        shape="clipboard"
        size="30"
      ></clr-icon>
      <span class="nav-text"> Journal </span>
    </a>

    <clr-vertical-nav-group routerLinkActive="active">
      <clr-icon
        shape="file-settings"
        size="30"
        role="none"
        clrverticalnavicon
      ></clr-icon>
      CONFIGURATIONS

      <clr-vertical-nav-group-children>
        <a
          clrVerticalNavLink
          routerLink="./normal/pidgey"
          routerLinkActive="active"
        >
          <clr-icon shape="container-volume" size="20"></clr-icon>
          Entrepot
        </a>
        <a
          clrVerticalNavLink
          routerLink="./normal/snorlax"
          routerLinkActive="active"
        >
          <clr-icon shape="container" size="20"></clr-icon>
          Type Contenaire
        </a>
        <a
          clrVerticalNavLink
          routerLink="./normal/snorlax"
          routerLinkActive="active"
        >
          <clr-icon shape="folder" size="20"></clr-icon>
          Categorie Dossier
        </a>
        <a
          clrVerticalNavLink
          routerLink="./normal/snorlax"
          routerLinkActive="active"
        >
          <clr-icon shape="folder" size="20"></clr-icon>
          Categorie Dossier
        </a>
        <a
          clrVerticalNavLink
          routerLink="./normal/snorlax"
          routerLinkActive="active"
        >
          <clr-icon shape="file-group" size="20"></clr-icon>
          Groupe De Fichiers
        </a>

        <a
          clrVerticalNavLink
          routerLink="./normal/snorlax"
          routerLinkActive="active"
        >
          <clr-icon shape="user" size="20"></clr-icon>
          Utilisateurs & Permissions
        </a>
      </clr-vertical-nav-group-children>
    </clr-vertical-nav-group>
  `,
  styles: [],
})
export class SeadbarComponent implements OnInit {
  constructor() {}

  permission: boolean = false;

  ngOnInit(): void {
    if (localStorage.getItem('permission') == '1') {
      this.permission = true;
    }
  }
}
