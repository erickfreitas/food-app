import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmCategoryPage } from './adm-category';

@NgModule({
  declarations: [
    AdmCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(AdmCategoryPage),
  ],
})
export class AdmCategoryPageModule {}
