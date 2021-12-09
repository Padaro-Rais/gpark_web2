import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

const TOKEN_KEY = 'auth-token'
const USER_KEY = 'auth-user'
const TOKEN_TYPE = 'token-type'
const EXPIRED = 'token-expired'
const PERMISSIONS = 'auth-permissions'


@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor(private route: Router) {}

  signOut(): void {
    window.sessionStorage.clear()
    this.route.navigateByUrl('/auth/login')
  }

  // stochage du type de tonken
  public saveTokenType(token_type: string): void {
    window.sessionStorage.removeItem(TOKEN_TYPE)
    window.sessionStorage.setItem(TOKEN_TYPE, token_type)
  }
  // stockage du token
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY)
    window.sessionStorage.setItem(TOKEN_KEY, token)
  }
  // duree d'esxpiration
  public saveTokenExpired(token_expired: string): void {
    window.sessionStorage.removeItem(EXPIRED)
    window.sessionStorage.setItem(EXPIRED, token_expired)
  }
  ///////////////////////////////////////////////////////////

  // recuperation du type token
  public getTokentype(): string | null {
    return window.sessionStorage.getItem(TOKEN_TYPE)
  }

  // recuperation du token
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY)
  }

  // recuperation du token expiration
  public getTokenExpired(): string | null {
    return window.sessionStorage.getItem(EXPIRED)
  }

  // sauvegarde de l'utilisateur de l'utilisateur
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY)
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  public savePermissions(perms: any): void {
    window.sessionStorage.removeItem(PERMISSIONS)
    window.sessionStorage.setItem(PERMISSIONS, JSON.stringify(perms))
  }

  // revois lutilisateur en question
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY)
    if (user) {
      return JSON.parse(user)
    }
    return {}
  }

  public getPermissions(): any {
    const perms = window.sessionStorage.getItem(PERMISSIONS)
    if (perms) {
      return JSON.parse(perms)
    }
    return {}
  }
}
