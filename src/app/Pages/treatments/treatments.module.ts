import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreatmentsPageRoutingModule } from './treatments-routing.module';
import { TreatmentsPage } from './treatments.page';
import { ImageCardComponent } from 'src/app/Components/image-card/image-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreatmentsPageRoutingModule,
    ImageCardComponent
  ],
  declarations: [TreatmentsPage]
})
export class TreatmentsPageModule {}
