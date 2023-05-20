import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionUserService } from 'src/app/services/autenticacion-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  aparece = true;
  registrado = false;

  constructor(private router: Router, private authUser: AutenticacionUserService) { }

  ngOnInit(): void {
    this.authUser.estadousuario().subscribe(async userstate => {
      if (userstate != null){
        this.registrado = true
      }
      else{
        this.registrado = false
      }
    })
  }

  iconousuario(){
    
    if(this.authUser.currentUser() == null){
      this.router.navigate(['user-login'])
    }
    else{
      this.router.navigate(['user-profile'])
    }
  }

  desplegar(){
    this.aparece = !this.aparece
  }

}
