import { Materiel } from './../../../Models/materiel';
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

    <clr-vertical-nav-group routerLinkActive="active">
      <clr-icon shape="tools" clrVerticalNavIcon></clr-icon>
      <span class="sib_items">Matériels</span>
      <clr-vertical-nav-group-children>
        <a
          clrVerticalNavLink
          routerLink="/app/materials"
          routerLinkActive="active"
        >
          <span class="sib_item"> Liste des Materiels</span>
        </a>
        <!-- <a
          clrVerticalNavLink
          routerLink="/app/add-Material"
          routerLinkActive="active"
        >
        <span class="sib_item">Nouveau Materiel</span>
        </a> -->
        <a
          clrVerticalNavLink
          routerLink="/app/archives"
          routerLinkActive="active"
        >
          <span class="sib_item"> Archives</span>
        </a>
      </clr-vertical-nav-group-children>
    </clr-vertical-nav-group>
    <clr-vertical-nav-group routerLinkActive="active">
      <clr-icon shape="list" clrVerticalNavIcon></clr-icon>
      <span class="sib_items">Contrats de maintenance</span>
      <clr-vertical-nav-group-children>
        <a
          clrVerticalNavLink
          routerLink="/app/contracts"
          routerLinkActive="active"
        >
          <span class="sib_item"> Liste des contrats</span>
        </a>
        <!-- <a
          clrVerticalNavLink
          routerLink="/app/add-Contract"
          routerLinkActive="active"
        >
        <span class="sib_item"> Nouveau contrat</span>
        </a> -->
      </clr-vertical-nav-group-children>
    </clr-vertical-nav-group>
    <clr-vertical-nav-group routerLinkActive="active">
      <clr-icon shape="tasks" clrVerticalNavIcon></clr-icon>
      <span class="sib_items">Tâches</span>
      <clr-vertical-nav-group-children>
        <a clrVerticalNavLink routerLink="/app/tasks" routerLinkActive="active">
          <span class="sib_item">Liste des tâches </span>
        </a>
        <!-- <a
            clrVerticalNavLink
            routerLink="/app/add-Task"
            routerLinkActive="active"
          >
            Nouvelle tache
          </a> -->
      </clr-vertical-nav-group-children>
    </clr-vertical-nav-group>
    <clr-vertical-nav-group routerLinkActive="active">
      <clr-icon shape="cog" clrVerticalNavIcon></clr-icon>
      <span class="sib_items">Configurations</span>
      <clr-vertical-nav-group-children>
        <a
          routerLink="/app/materialGroupe"
          routerLinkActive="active"
          clrVerticalNavLink
        >
          <span class="sib_item"> Groupes materiels</span>
        </a>
        <a
          routerLink="/app/materialCategorie"
          routerLinkActive="active"
          clrVerticalNavLink
        >
          <span class="sib_item"> Catégories Materiels</span>
        </a>

        <a
          routerLink="/app/companies"
          routerLinkActive="active"
          clrVerticalNavLink
        >
          <span class="sib_item">Localisation Materiels</span>
        </a>

        <a
          routerLink="/app/materialProvider"
          routerLinkActive="active"
          clrVerticalNavLink
        >
          <span class="sib_item">Prestataires</span>
        </a>

        <a
          *ngIf="permission"
          routerLink="/app/users"
          routerLinkActive="active"
          class="nav-link"
        >
          <span class="sib_item">Utilisateurs</span>
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
