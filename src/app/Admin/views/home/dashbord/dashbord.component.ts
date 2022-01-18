import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  template: `
    <div class="app-page-header clr-row">
      <div class="clr-col-sm-12">
        <div class="page-title">
          <div class="card-header">
            <h2>Gestion des archives</h2>
          </div>
        </div>
      </div>
    </div>

    <br />

    <!-- Page Content -->
    <div class="clr-col-12">
      <div class="clr-row">
        <div class="clr-col-md-4 clr-col-12">
          <div class="card big-card">
            <div class="card-header">Versement</div>
            <hr>
            <div class="card-block">
              <div class="clr-row">
                <clr-icon
                  class="clr-col-3"
                  shape="install"
                  size="50"
                ></clr-icon>
                <div class="clr-col-9">Ajoutez un nouveau groupe de fichiers</div>
              </div>
              <div class="card-text"></div>
            </div>
            <div class="card-footer">
              <button class="btn btn-outline-primary">
                <clr-icon shape="plus-circle" class="is-solid"></clr-icon>
                Nouveau Versement
              </button>
            </div>
          </div>
        </div>

        <div class="clr-col-md-4 clr-col-12">
          <div class="card big-card">
            <div class="card-header">Dépôt de dossier</div>
            <hr>
            <div class="card-block">
              <div class="clr-row">
                <clr-icon
                  class="clr-col-3"
                  shape="folder-open"
                  size="50"
                ></clr-icon>
                <div class="clr-col-9">Accédez au formulaire d'ajout d'un nouveau dossier</div>
              </div>
              <div class="card-text"></div>
            </div>
            <div class="card-footer">
              <button class="btn btn-outline-primary">
                <clr-icon shape="plus-circle" class="is-solid"></clr-icon>
                Nouveau Dossier
              </button>
            </div>
          </div>
        </div>

        <div class="clr-col-md-4 clr-col-12">
          <div class="card big-card">
            <div class="card-header">Enrégistrement de fichier</div>
            <hr>
            <div class="card-block">
              <div class="clr-row">
                <clr-icon
                  class="clr-col-3"
                  shape="file-group"
                  size="50"
                ></clr-icon>
                <div class="clr-col-9"> Ajoutez un nouveau fichier</div>
              </div>
              <div class="card-text"></div>
            </div>
            <div class="card-footer">
              <button class="btn btn-outline-primary">
                <clr-icon shape="plus-circle" class="is-solid"></clr-icon>
                Nouveau Fichier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
