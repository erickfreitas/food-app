import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmProductsPage } from './adm-products';

@NgModule({
  declarations: [
    AdmProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdmProductsPage),
  ],
})
export class AdmProductsPageModule {}
