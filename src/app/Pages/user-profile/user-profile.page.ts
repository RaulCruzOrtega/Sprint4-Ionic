import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { AutenticacionUserService } from 'src/app/services/autenticacion-user.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ImageStorageService } from 'src/app/services/image-storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  imagenpropia = false
  informacionUsuario!: User
  imagendelUsuario!: string
  aparece = false
  infoAlergenos = ""
  cpinfoAlergenos = ""
  modoEdicion = false

  suscripcionEstadoUsuario!: Subscription
  suscripcionUsuario!: Subscription

  constructor(private authUser: AutenticacionUserService, private database: DatabaseService, private servicioImagenes: ImageStorageService, private router: Router){}

  async ngOnInit(){
    this.suscripcionEstadoUsuario = await this.authUser.estadousuario().subscribe(async userstate => {
      if (userstate != null){
        this.suscripcionUsuario = await this.database.getUserwithEmail(userstate?.email!).subscribe(user =>{
          this.informacionUsuario = user[0];
          this.infoAlergenos = this.informacionUsuario.Alergias;
          if(this.informacionUsuario.userImage != ""){
            this.servicioImagenes.cargarUrlImagenUsuario(this.informacionUsuario.userImage).then(resp => {
              this.imagendelUsuario = resp
              this.imagenpropia = true;
            })
          }
          else{
            this.imagenpropia = false;
            this.imagendelUsuario = "";
          }
          this.aparece = true
        })
      }
      else {
        this.suscripcionUsuario = this.authUser.estadousuario().subscribe()
        this.router.navigate(['user-login'])
      }
    })
    
  }

  logout(){
    this.authUser.logout();
    this.router.navigate(['treatments'])
  }

  pedirCita(){
    this.router.navigate(['contact-us'])
  }

  uploadImageUser(event: any){
    const file = event.target.files[0];
    this.servicioImagenes.guardarImagenUsuario(this.informacionUsuario, file)
    .then(response => {
      this.database.updateImageUser(this.informacionUsuario.id!, response.metadata.fullPath);
    });
    
  }

  editarAlergenos(){
    this.modoEdicion = true
    this.cpinfoAlergenos = this.infoAlergenos
  }

  guardarAlergenos(){
    this.modoEdicion = false
    this.database.updateAllergiesInformation(this.informacionUsuario.id!,this.infoAlergenos)
  }

  cancelarAlergenos(){
    this.modoEdicion = false
    this.infoAlergenos = this.cpinfoAlergenos
  }

  ngOnDestroy(): void {
    this.suscripcionEstadoUsuario.unsubscribe();
    if (this.aparece == true){
      this.suscripcionUsuario!.unsubscribe();
    }
    
  }

}
