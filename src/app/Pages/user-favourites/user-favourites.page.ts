import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Treatment } from '../../interfaces/treatment.interface';
import { DatabaseService } from 'src/app/services/database.service';
import { SqliteService } from 'src/app/services/sqlite.service';
import { AutenticacionUserService } from 'src/app/services/autenticacion-user.service';

@Component({
  selector: 'app-user-favourites',
  templateUrl: './user-favourites.page.html',
  styleUrls: ['./user-favourites.page.scss'],
})
export class UserFavouritesPage implements OnInit {

  fav_treatments: Treatment[] = []

  constructor(private database: DatabaseService,
    private usuario: AutenticacionUserService,
    private sqliteService: SqliteService
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.fav_treatments = [];
    let suscibe_Auth = this.usuario.estadousuario().subscribe( user => {
      console.log(user)
      if (user != null){
        let suscibe_UserInf = this.database.getUserwithEmail(user!.email!).subscribe( userInfo => {
          console.log(userInfo)
          this.sqliteService.getFavorites(userInfo[0].id!).then( favoritos => { 
            console.log(favoritos)
            for (let favid of favoritos){ 
              let suscibe_treat = this.database.getTreatment(favid).subscribe(treatment => {
                console.log(treatment)
                this.fav_treatments.push(treatment!)
                // console.log(this.fav_treatments)
                suscibe_treat.unsubscribe()
              })
           }
          });
          suscibe_UserInf.unsubscribe()
        })
      }
      suscibe_Auth.unsubscribe()
    })
  }

}