import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthServivesService } from './auth-servives.service'

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  template: `
    <div class="login-wrapper">
      <form class="login" [formGroup]="formGroup" (ngSubmit)="LoginProcess()">
        <section class="title">
          <h3 class="welcome"><b>Bienvenue sur LGMAO</b></h3>
          <p>Gestion de maintenance assistée par ordinateur</p>
        </section>
        <div class="login-group">
            <label class="clr-sr-only">Email</label>
            <input
              class="form-control form-control-sm"
              type="email"
              clrInput
              placeholder="Email"
              formControlName="email"
            />

            <label class="clr-sr-only">Password</label>
            <input
               class="form-control form-control-sm"
              type="password"
              placeholder="mot de passe"
              formControlName="password"
            />
          <!-- <clr-checkbox-wrapper> -->
            <!-- <label>Remember me</label>
            <input type="checkbox" name="rememberMe" /> -->
          <!-- </clr-checkbox-wrapper> -->
          <!--<div class="error active">
        Invalid user name or password
      </div>-->
          <button type="submit" *ngIf="hideBtn" class="btn btn-primary">
            S'authentifier
          </button>

          <button
            type="submit"
            *ngIf="showBtn"
            class="btn btn-primary"
            disabled
          >
            S'authentifier
          </button>

        </div>
      </form>
    </div>
  `,
  styles: [

  ],
})

export class LoginComponent implements OnInit {
  title = 'LGMAO'
  formGroup: any
  iscon: boolean = false
  hideBtn: boolean = true
  showBtn: boolean = false

  token: any
  data: any

  constructor(
    private AuthService: AuthServivesService,
    private router: Router,
    private toastr: ToastrService,
  ) {}
  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  LoginProcess() {
    this.hideBtn = false
    this.showBtn = true

    if (this.formGroup.valid) {
      this.AuthService.login(this.formGroup.value).subscribe(
        (res) => {
          ;(this.data = res), localStorage.setItem('token', this.data.token)

          localStorage.setItem('permission', this.data.user.role_id)

          console.log(this.data.user.role_id)
          this.iscon = true

          this.router.navigateByUrl('/app/dashbord')
        },
        (err) => {
          this.hideBtn = true
          this.showBtn = false
          this.toastr.error('Email ou Mot de passe incorrect')
        },
      )
    }
  }
}

