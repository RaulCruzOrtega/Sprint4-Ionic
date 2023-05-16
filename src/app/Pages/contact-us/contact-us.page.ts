import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service'
import { Contact } from '../../interfaces/contact.interface'
import { Router } from '@angular/router';
import { AutenticacionUserService } from '../../services/autenticacion-user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss']
})
export class ContactUsPage implements OnInit, OnDestroy{
title="Contacto"
contactForm!: FormGroup
contact!: Contact
infoCard!: any[]
aparecenErrores: boolean = false
aparece = false
registrado = false

suscripcionEstadoUsuario!: Subscription
suscripcionUsuario!: Subscription
suscripcionInfoCards!: Subscription


constructor(private builder: FormBuilder, private database: DatabaseService, private router: Router, private authUser: AutenticacionUserService) { }

  async ngOnInit(){
    this.suscripcionEstadoUsuario = await this.authUser.estadousuario().subscribe(async user => {
      if (user != null){
        this.registrado = true
        this.suscripcionUsuario = await this.database.getUserwithEmail(user.email!).subscribe(user => {
          this.contactForm.controls['userName'].setValue(user[0].userName);
          this.contactForm.controls['userName'].disable();
          this.contactForm.controls['userEmail'].setValue(user[0].userEmail);
          this.contactForm.controls['userEmail'].disable();
          this.contactForm.controls['phoneNumber'].setValue(user[0].phoneNumber);
          this.contactForm.controls['phoneNumber'].disable();
        })
      }
    })
    this.aparece = true
    
    this.contactForm = this.initForm();
  
    this.suscripcionInfoCards = this.database.getInfoCards()
    .subscribe(infoForCards => {
      this.infoCard = infoForCards;
    })
  }

  usuarioregistrado(){
    if ( this.authUser.currentUser() != null){
      return true
    }
    else{
      return false
    }
  }

  initForm(): FormGroup {
    return this.builder.group({
  
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
  
      userEmail: new FormControl('', [
        Validators.required,
        Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$"),
      ]),
  
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/[0-9]{9}$/),
        Validators.max(999999999),
      ]),
  
      subject: new FormControl('', [
        Validators.required,
      ]),
  
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(200),
      ])
    })
  }

  async onSubmit(){
    if (this.contactForm.valid){
    this.aparecenErrores = false;
    alert("Mensaje enviado con exito");
    this.contactForm.controls['userName'].enable();
    this.contactForm.controls['userEmail'].enable();
    this.contactForm.controls['phoneNumber'].enable();
    const response = await this.database.addContactMessage(this.contactForm.value);
    if (this.usuarioregistrado()){
      this.contactForm.controls['userName'].disable();
    this.contactForm.controls['userEmail'].disable();
    this.contactForm.controls['phoneNumber'].disable();
      this.contactForm.controls['subject'].setValue("");
      this.contactForm.controls['message'].setValue("");
    } else {
      this.contactForm.controls['userName'].setValue("");
      this.contactForm.controls['userEmail'].setValue("");
      this.contactForm.controls['phoneNumber'].setValue("");
      this.contactForm.controls['subject'].setValue("");
      this.contactForm.controls['message'].setValue("");
    }
    } else {
      this.aparecenErrores = true;
      console.log("Error en el formulario");
    }
  }

  ngOnDestroy(): void {
    this.suscripcionEstadoUsuario.unsubscribe();
    this.suscripcionInfoCards.unsubscribe();
    if(this.registrado == true){
      this.suscripcionUsuario.unsubscribe();
    }
  }

}