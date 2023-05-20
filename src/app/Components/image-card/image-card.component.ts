import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AutenticacionUserService } from 'src/app/services/autenticacion-user.service';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class ImageCardComponent  implements OnInit {
  @Input() img!: string;
  @Input() name!: string;
  @Input() linkroute!: any;
  favorito = false;
  registradoUsuario = false
  
  constructor(private usuario: AutenticacionUserService) { }

  ngOnInit() {
    this.usuario.estadousuario().subscribe(async userstate => {
      if (userstate != null){
        this.registradoUsuario = true
      }
      else{
        this.registradoUsuario = false
      }
    })
  }

  favo(){
    this.favorito = !this.favorito
  }

}
