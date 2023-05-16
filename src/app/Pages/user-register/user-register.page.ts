import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { AutenticacionUserService } from 'src/app/services/autenticacion-user.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
})
export class UserRegisterPage implements OnInit {

  singupForm!: FormGroup;
   users!: User[];
   exist: boolean = false;
   aparecenErrores = false;
   contradistintas = true;
   userError: string = "Este usuario ya se encuentra registrado."
  
   suscripcionUsuarios!: Subscription
  
   constructor (private builder: FormBuilder, private database: DatabaseService, private router: Router, private userAuth: AutenticacionUserService) { }
  
   async ngOnInit(){
    this.singupForm = this.initForm()
  
    this.suscripcionUsuarios = await this.database.getUsers()
    .subscribe(users => {this.users = users})
   }
  
  initForm(): FormGroup {
    return this.builder.group({
  
      userName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]],
      userEmail: ['', [
        Validators.required,
        Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/)
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/[0-9]{9}$/),
        Validators.max(999999999),
      ]],
      userDNI: ['', [
        Validators.required,
        Validators.pattern(/[0-9]{8}[A-Za-z]/),
        Validators.maxLength(9)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmPassword: ['',[
        Validators.required,     
        Validators.minLength(6)
      ]]
    })
  }
  
  
  passwordConfirmation(){
    const password = this.singupForm.get('password')?.value;
    const confirmPassword = this.singupForm.get('confirmPassword')?.value;
    if ((password == confirmPassword) && (password != "")) {
      return false;
    }
    return true;
  }
  
  
  userValidation(){
    for (let user of this.users){
      if (this.singupForm.value.userDNI == user.userDNI){
        this.userError = "El DNI introducido coincide con uno ya registrado."
        this.exist = true;
      } else if (this.singupForm.value.userEmail == user.userEmail){
        this.userError = "El correo electrónico introducido coincide con uno ya registrado."
        this.exist = true;
      } else if (this.singupForm.value.phoneNumber == user.phoneNumber){
        this.userError = "El número de teléfono introducido coincide con uno ya registrado."
        this.exist = true;
      }
    }
  }
  
  async onSubmit(){
    this.exist = false;
    this.aparecenErrores = true
    this.contradistintas = this.passwordConfirmation();
    if (this.singupForm.valid){
      this.userValidation();
      if (!this.exist){
      const NuevoUsuario: User = {
        userImage: "",
        userName: this.singupForm.value.userName,
        userEmail: this.singupForm.value.userEmail,
        phoneNumber: this.singupForm.value.phoneNumber,
        userDNI: this.singupForm.value.userDNI,
        Alergias: ""
      }
      const responseAuth = await this.userAuth.registerUser(this.singupForm.value.userEmail, this.singupForm.value.password)
      const response = await this.database.addUser(NuevoUsuario);
      this.router.navigate(['/treatments']);
      }
    }
  }
  
  ngOnDestroy(): void {
    this.suscripcionUsuarios.unsubscribe();
  }
  
}
