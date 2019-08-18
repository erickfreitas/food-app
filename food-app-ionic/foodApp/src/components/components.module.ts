import { NgModule } from '@angular/core';
import { QuantityComponent } from './quantity/quantity';
import { IonicModule } from 'ionic-angular';
import { TabComponent } from './tab/tab';
@NgModule({
	declarations: [QuantityComponent,
    TabComponent],
	imports: [IonicModule],
	exports: [QuantityComponent,
    TabComponent]
})
export class ComponentsModule {}
