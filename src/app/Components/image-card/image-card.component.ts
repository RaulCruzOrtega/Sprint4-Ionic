import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AutenticacionUserService } from 'src/app/services/autenticacion-user.service';
import { SqliteService } from 'src/app/services/sqlite.service';
import { DatabaseService } from 'src/app/services/database.service';
import { User } from '../../interfaces/user.interface';

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
  @Input() treatment_id!: string;
  favorito = false;
  registradoUsuario = false
  
  constructor(
    private usuario: AutenticacionUserService, 
    private sqliteService: SqliteService,
    private database: DatabaseService
    
    ) { }

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

  async favo() {
    this.favorito = !this.favorito
    this.usuario.estadousuario().subscribe( user => {
      if (user != null){
        this.database.getUserwithEmail(user!.email!).subscribe( userInfo => {
          if (this.favorito == true) {
            console.log(userInfo[0].id)
            this.sqliteService.addFavorite(userInfo[0].id!, this.treatment_id)
          }
          else {
            this.sqliteService.deleteFavorite(userInfo[0].id!, this.treatment_id)
          }
        })
      }
    })
  }
    
}
