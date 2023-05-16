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


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
