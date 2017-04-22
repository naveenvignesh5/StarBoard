import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { LocationTracker } from '../providers/location-tracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {Register} from '../pages/register/register';
import {Login} from '../pages/login/login';
import {Dashboard} from '../pages/dashboard/dashboard';
import {Map} from '../pages/map/map';

import {DataBaseUtil} from '../providers/databaseutil';


@NgModule({
  declarations: [
    MyApp,
    HomePage,Register,Login,Dashboard,Map
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,Register,Login,Dashboard,Map
  ],
  providers: [
    LocationTracker,
    BackgroundGeolocation,
    Geolocation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},DataBaseUtil
  ]
})
export class AppModule {}
