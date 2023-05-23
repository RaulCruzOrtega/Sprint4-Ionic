import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'treatments',
    pathMatch: 'full'
  },
  {
    path: 'treatments',
    loadChildren: () => import('./Pages/treatments/treatments.module').then( m => m.TreatmentsPageModule)
  },
  {
    path: 'treatment/:name',
    loadChildren: () => import('./Pages/treatment/treatment.module').then( m => m.TreatmentPageModule)
  },
  {
    path: 'user-login',
    loadChildren: () => import('./Pages/user-login/user-login.module').then( m => m.UserLoginPageModule)
  },
  {
    path: 'user-register',
    loadChildren: () => import('./Pages/user-register/user-register.module').then( m => m.UserRegisterPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./Pages/contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./Pages/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'user-favourites',
    loadChildren: () => import('./Pages/user-favourites/user-favourites.module').then( m => m.UserFavouritesPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
