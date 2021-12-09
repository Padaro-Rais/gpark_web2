import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  template: `
    <div class="app-page-header clr-row">
      <div class="clr-col-sm-12">
        <div class="card">
          <div class="card-header">
            <h2>Gestion de maintenance assistée par ordinateur</h2>

            Gérer les informations relatifs à la gestion de maintenance assistée
            par ordinateur
          </div>
        </div>
      </div>
    </div>

    <!-- Page Content -->

    <!-- <div class="clr-col-5">
    <h3>Statistiques</h3>
  </div> -->
    <div class="clr-col-sm-5" id="stat">
      <app-home></app-home>
    </div>

    <div class="clr-col-sm-12">
      <div class="clr-row">
        <div class="clr-col-lg-4 clr-col-md-6 clr-col-sm-12">
          <div class="card big-card">
            <div class="card-header" id="card-title">Matériels</div>
            <div class="card-block clr-row">
              <div class="big-icon">
                <clr-icon shape="tools"></clr-icon>
              </div>
              <div class="card-text clr-col-9">
                Parcourir et consulter l'état des équipements
              </div>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary" (click)="materiel()" id="myBtn">
                <clr-icon shape="folder-open"></clr-icon>
                Parcourir
              </button>
            </div>
          </div>
        </div>

        <div class="clr-col-lg-4 clr-col-md-6 clr-col-sm-12">
          <div class="card big-card">
            <div class="card-header" id="card-title">Groupes Matériels</div>
            <div class="card-block clr-row">
              <div class="big-icon">
                <clr-icon shape="box-plot"></clr-icon>
              </div>
              <div class="card-text clr-col-9">
                Parcourir et gérer les groupes d'équipements
              </div>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary" (click)="groupe()">
                <clr-icon shape="folder-open"></clr-icon>
                Parcourir
              </button>
            </div>
          </div>
        </div>

        <div class="clr-col-lg-4 clr-col-md-6 clr-col-sm-12">
          <div class="card big-card">
            <div class="card-header" id="card-title">Catégories Matériels</div>
            <div class="card-block clr-row">
              <div class="big-icon">
                <clr-icon shape="bubble-chart"></clr-icon>
              </div>
              <div class="card-text clr-col-9">
                Parcourir et gérer les Catégories d'équipements
              </div>
            </div>
            <div class="card-footer">
              <button
                class="btn btn-primary"
                [disabled]="false"
                (click)="categorie()"
              >
                <clr-icon shape="folder-open"></clr-icon>
                Parcourir
              </button>
            </div>
          </div>
        </div>

        <div class="clr-col-lg-4 clr-col-md-6 clr-col-sm-12">
          <div class="card big-card">
            <div class="card-header" id="card-title">Adresses Matériels</div>
            <div class="card-block clr-row">
              <div class="big-icon">
                <clr-icon shape="clipboard"></clr-icon>
              </div>
              <div class="card-text clr-col-9">
                gérer l'adressage d'équipements
              </div>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary" (click)="adresse()">
                <clr-icon shape="folder-open"></clr-icon>
                Parcourir
              </button>
            </div>
          </div>
        </div>

        <div class="clr-col-lg-4 clr-col-md-6 clr-col-sm-12">
          <div class="card big-card">
            <div class="card-header" id="card-title">Tâches</div>
            <div class="card-block clr-row">
              <div class="big-icon">
                <clr-icon shape="tasks"></clr-icon>
              </div>
              <div class="card-text clr-col-9">
                Consulter et planifier des tâches
              </div>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary" (click)="tache()">
                <clr-icon shape="folder-open"></clr-icon>
                Parcourir
              </button>
            </div>
          </div>
        </div>

        <div class="clr-col-lg-4 clr-col-md-6 clr-col-sm-12">
          <div class="card big-card">
            <div class="card-header" id="card-title">
              Contrats de maintenance
            </div>
            <div class="card-block clr-row">
              <div class="big-icon">
                <clr-icon shape="list"></clr-icon>
              </div>
              <div class="card-text clr-col-9">
                gérer les contrats de maintenance
              </div>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary" (click)="contrat()">
                <clr-icon shape="folder-open"></clr-icon>
                Parcourir
              </button>
            </div>
          </div>
        </div>

        <div class="clr-col-lg-4 clr-col-md-6 clr-col-sm-12">
          <div class="card big-card">
            <div class="card-header" id="card-title">Utilisateurs</div>
            <div class="card-block clr-row">
              <div class="big-icon">
                <clr-icon shape="users"></clr-icon>
              </div>
              <div class="card-text clr-col-9">Gestions des utilisateurs</div>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary" (click)="utilisateur()">
                <clr-icon shape="folder-open"></clr-icon>
                Parcourir
              </button>
            </div>
          </div>
        </div>

        <div class="clr-col-lg-4 clr-col-md-6 clr-col-sm-12">
          <div class="card big-card">
            <div class="card-header" id="card-title">Prestataires</div>
            <div class="card-block clr-row">
              <div class="big-icon">
                <clr-icon shape="assign-user"></clr-icon>
              </div>
              <div class="card-text clr-col-9">
                Découvrir la liste des prestataires
              </div>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary" (click)="prestataire()">
                <clr-icon shape="folder-open"></clr-icon>
                Parcourir
              </button>
            </div>
          </div>
        </div>

        <!-- <div class="clr-col-lg-4 clr-col-md-6 clr-col-sm-12">
            <div class="card big-card">
              <div class="card-header" id="card-title">Statistiques</div>
              <div class="card-block clr-row">
                <div class="big-icon">
                  <clr-icon shape="pie-chart"></clr-icon>
                </div>
                <div class="card-text clr-col-9">Visualiser un état global</div>
              </div>
              <div class="card-footer">
                <button class="btn btn-primary" (click)="statistiques()">
                  <clr-icon shape="folder-open"></clr-icon>
                  Parcourir
                </button>
              </div>
            </div>
          </div> -->
      </div>
    </div>

    <!-- <div class="grid-stack">
      <a routerLink="/app/add-Material">
        <div class="column_stack">
          <div class="card_stack" id="dashboard1">
            <span class="format">
              <span>0</span>
            </span>
            <p></p>
            <div class="title">Nouveau Matériel</div>
            <div class="topright">
              <clr-icon shape="tools" size="35"></clr-icon>
            </div>
          </div>
        </div>
      </a>

      <a routerLink="/app/add-user">
        <div class="column_stack">
          <div class="card_stack" id="dashboard2">
            <span class="format">
              <span>0</span>
            </span>
            <p></p>
            <div class="title">Nouvel Utilisateur</div>
            <div class="topright">
              <clr-icon shape="users" size="35"></clr-icon>
            </div>
          </div>
        </div>
      </a>

      <div class="column_stack">
        <div class="card_stack" id="dashboard3">
          <span class="format">
            <span>0</span>
          </span>
          <p></p>
          <div class="title">Nouveau Prestataire</div>
          <div class="topright">
            <clr-icon shape="assign-user" size="35"></clr-icon>
          </div>
        </div>
      </div>

      <a routerLink="/app/add-Task">
        <div class="column_stack">
          <div class="card_stack" id="dashboard4">
            <span class="format">
              <span>0</span>
            </span>
            <p></p>
            <div class="title">Nouvelle Tâche</div>
            <div class="topright">
              <clr-icon shape="tasks" size="35"></clr-icon>
            </div>
          </div>
        </div>
      </a>
    </div> -->
  `,
  styleUrls: ['dashbord.component.css'],
})
export class DashbordComponent implements OnInit {
  constructor(private router: Router) {}

  permission: boolean = false;

  ngOnInit(): void {
    if (localStorage.getItem('permission') == '1') {
      this.permission = true;
    }
  }

  materiel() {
    this.router.navigateByUrl('/app/materials');
  }

  groupe() {
    this.router.navigateByUrl('/app/materialGroupe');
  }

  categorie() {
    this.router.navigateByUrl('/app/materialCategorie');
  }

  adresse() {
    this.router.navigateByUrl('/app/companies');
  }

  tache() {
    this.router.navigateByUrl('/app/tasks');
  }

  contrat() {
    this.router.navigateByUrl('/app/contracts');
  }

  utilisateur() {
    this.router.navigateByUrl('/app/users');
  }

  prestataire() {
    this.router.navigateByUrl('/app/materialProvider');
  }

  statistiques() {
    this.router.navigateByUrl('/app/statistiques');
  }
}
