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

    <!-- Page Content -->
    <div class="clr-col-12">
      <div class="clr-row">
        <div class="clr-col-md-4 clr-col-12">
          <div class="card big-card">
            <div class="card-header">Header</div>
            <div class="card-block">
              <div class="card-title">Versement</div>
              <div class="card-text">...</div>
            </div>
            <div class="card-footer">
              <button class="btn btn-outline-primary">Nouveau Versement</button>
            </div>
          </div>
        </div>

        <div class="clr-col-md-4 clr-col-12">
          <div class="card big-card">
            <div class="card-header">Header</div>
            <div class="card-block">
              <div class="card-title">Dépôt de dossier</div>
              <div class="card-text">...</div>
            </div>
            <div class="card-footer">
              <button class="btn btn-outline-primary">Nouveau Dossier</button>
            </div>
          </div>
        </div>

        <div class="clr-col-md-4 clr-col-12">
          <div class="card big-card">
            <div class="card-header">Header</div>
            <div class="card-block">
              <div class="card-title">Enrégistrement de fichier</div>
              <div class="card-text">...</div>
            </div>
            <div class="card-footer">
              <button class="btn btn-outline-primary">Nouveau Fichier</button>
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
