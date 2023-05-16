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



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
