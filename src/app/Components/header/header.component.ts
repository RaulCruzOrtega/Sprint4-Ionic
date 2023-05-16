import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  aparece = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  iconousuario(){
  //   if(this.authUser.currentUser() == null){
  //     this.router.navigate(['user-login'])
  //   }
  //   else{
  //     this.router.navigate(['user-profile'])  
  //   }
  }

  desplegar(){
    this.aparece = !this.aparece
  }

}
