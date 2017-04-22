import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Dashboard } from './dashboard';

@NgModule({
  declarations: [
    Dashboard,
  ],
  imports: [
    IonicPageModule.forChild(Dashboard),
  ],
  exports: [
    Dashboard
  ]
})
export class DashboardModule {}
