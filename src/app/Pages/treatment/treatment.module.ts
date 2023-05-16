import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreatmentPageRoutingModule } from './treatment-routing.module';

import { TreatmentPage } from './treatment.page';
import { ImageCardComponent } from 'src/app/Components/image-card/image-card.component';
import { ImageDescriptionButtonComponent } from 'src/app/Components/image-description-button/image-description-button.component';
import { CardComponent } from 'src/app/Components/card/card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreatmentPageRoutingModule,
    ImageDescriptionButtonComponent,
    CardComponent
  ],
  declarations: [TreatmentPage]
})
export class TreatmentPageModule {}
