import { Component, OnInit } from '@angular/core'

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
      ></clr-icon>
      <span class="nav-text">
        TABLEAU DE BORD
      </span>
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
      ></clr-icon>
      <span class="nav-text">
        CONTENAIRES
      </span>
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
      ></clr-icon>
      <span class="nav-text">
        DOSSIER
      </span>
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
      ></clr-icon>
      <span class="nav-text">
        FICHIERS
      </span>
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
      ></clr-icon>
      <span class="nav-text">
        Journal
      </span>
    </a>

    <clr-vertical-nav-group routerLinkActive="active">
      <clr-icon shape="file-settings"
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
         Entrepot
        </a>
        <a
          clrVerticalNavLink
          routerLink="./normal/snorlax"
          routerLinkActive="active"
        >
          Type Contenaire
        </a>
        <a
          clrVerticalNavLink
          routerLink="./normal/snorlax"
          routerLinkActive="active"
        >
          Categorie Dossier
        </a>
        <a
          clrVerticalNavLink
          routerLink="./normal/snorlax"
          routerLinkActive="active"
        >
          Categorie Dossier
        </a>
        <a
          clrVerticalNavLink
          routerLink="./normal/snorlax"
          routerLinkActive="active"
        >
          Groupe De Fichier
        </a>

        <a
          clrVerticalNavLink
          routerLink="./normal/snorlax"
          routerLinkActive="active"
        >
          Utilisateurs & Prermissions
        </a>
      </clr-vertical-nav-group-children>
    </clr-vertical-nav-group>
  `,
  styles: [],
})
export class SeadbarComponent implements OnInit {
  constructor() {}

  permission: boolean = false

  ngOnInit(): void {
    if (localStorage.getItem('permission') == '1') {
      this.permission = true
    }
  }
}
