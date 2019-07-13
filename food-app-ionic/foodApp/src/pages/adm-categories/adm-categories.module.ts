import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmCategoriesPage } from './adm-categories';

@NgModule({
  declarations: [
    AdmCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(AdmCategoriesPage),
  ],
})
export class AdmCategoriesPageModule {}
