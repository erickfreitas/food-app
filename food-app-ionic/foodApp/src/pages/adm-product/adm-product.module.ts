import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmProductPage } from './adm-product';

@NgModule({
  declarations: [
    AdmProductPage,
  ],
  imports: [
    IonicPageModule.forChild(AdmProductPage),
  ],
})
export class AdmProductPageModule {}
