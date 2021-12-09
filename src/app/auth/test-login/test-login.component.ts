import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServivesService } from '../login/auth-servives.service';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-test-login',
  templateUrl: './test-login.component.html',
  styleUrls: ['./test-login.component.css']
})
export class TestLoginComponent implements OnInit {

  isLoggedIn = false
  isLoginFailed = false
  errorMessage = ''
  roles: string[] = []

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
  ) {}

  title = 'Arch_Lik'
  formGroup: any
  iscon: boolean = false
  hideBtn: boolean = true
  showBtn: boolean = false

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true
      this.roles = this.tokenStorage.getUser().roles
    }

    this.initForm()
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  LoginProcess() {
    this.authService
      .login(this.formGroup.value.email, this.formGroup.value.password)
      .subscribe(
        (data) => {
          this.tokenStorage.saveTokenType(data.token_type)
          this.tokenStorage.saveToken(data.access_token)
          this.tokenStorage.saveTokenExpired(data.expires_in)
          this.tokenStorage.saveUser(data.user)
          this.tokenStorage.savePermissions(data.permissions)

          this.isLoginFailed = false
          this.isLoggedIn = true
          this.router.navigateByUrl('/app/dashbord')
        },
        (err) => {
          this.errorMessage = err.error.message
          this.isLoginFailed = true
        },
      )
  }

  reloadPage(): void {
    window.location.reload()
  }
}
