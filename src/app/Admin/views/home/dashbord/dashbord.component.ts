import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashboard.component.html',
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
