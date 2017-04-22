import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Map } from './map';

@NgModule({
  declarations: [
    Map,
  ],
  imports: [
    IonicPageModule.forChild(Map),
  ],
  exports: [
    Map
  ]
})
export class MapModule {}
