import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriesPage } from './categories';

@NgModule({
  declarations: [
    CategoriesPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(CategoriesPage),
  ],
})
export class CategoriesPageModule {}
