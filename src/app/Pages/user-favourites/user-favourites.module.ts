import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

import { IonicModule } from '@ionic/angular';

import { UserFavouritesPageRoutingModule } from './user-favourites-routing.module';

import { UserFavouritesPage } from './user-favourites.page';
import { ImageCardComponent } from 'src/app/Components/image-card/image-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserFavouritesPageRoutingModule,
    ImageCardComponent
  ],
  declarations: [UserFavouritesPage], 
  providers: [],
})
export class UserFavouritesPageModule {}
