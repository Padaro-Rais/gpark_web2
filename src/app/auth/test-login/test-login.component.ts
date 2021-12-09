import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServivesService } from '../login/auth-servives.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-test-login',
  templateUrl: './test-login.component.html',
  styleUrls: ['./test-login.component.css']
})
export class TestLoginComponent implements OnInit {

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
          this.toastr.error('Email ou mot de passe incorect')
        },
      )
    }
  }
}
