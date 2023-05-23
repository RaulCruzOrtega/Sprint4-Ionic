import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserFavouritesPage } from './user-favourites.page';


const routes: Routes = [
  {
    path: '',
    component: UserFavouritesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserFavouritesPageRoutingModule {}
