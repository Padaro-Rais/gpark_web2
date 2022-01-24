import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
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
