import { NgModule } from '@angular/core';
import { QuantityComponent } from './quantity/quantity';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [QuantityComponent],
	imports: [IonicModule],
	exports: [QuantityComponent]
})
export class ComponentsModule {}
