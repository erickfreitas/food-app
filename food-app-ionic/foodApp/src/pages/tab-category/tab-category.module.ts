import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabCategoryPage } from './tab-category';

@NgModule({
  declarations: [
    TabCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(TabCategoryPage),
  ],
})
export class TabCategoryPageModule {}
