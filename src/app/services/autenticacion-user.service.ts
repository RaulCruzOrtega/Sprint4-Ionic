import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, fetchSignInMethodsForEmail, authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionUserService {

  constructor(private auth: Auth) {}

  currentUser(){
    return this.auth.currentUser;
  }

  registerUser( email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  fetchEmail(email: string) {
    return fetchSignInMethodsForEmail(this.auth, email) 
  }

  estadousuario(){
    return authState(this.auth);
  }
}
