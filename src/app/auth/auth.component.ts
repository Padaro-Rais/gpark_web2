import { Component, OnInit } from '@angular/core';
import { AuthServivesService } from './login/auth-servives.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {

  ngOnInit(): void {
  }

}
