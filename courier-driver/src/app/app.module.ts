import {NgModule, ErrorHandler} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { Geolocation } from '@ionic-native/geolocation';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProfilePage } from '../pages/profile/profile';
import { AuthPage } from '../pages/auth/auth';
import { DriverProvider } from '../providers/driver/driver';
import { HttpClientModule } from '@angular/common/http';
import { OrderProvider } from '../providers/order/order';
import { OrdersPage } from '../pages/orders/orders';
import { OrderDetailPage } from '../pages/order-detail/order-detail';
import { ArchiveOrdersPage } from '../pages/archive-orders/archive-orders';
import { ClientProvider } from '../providers/client/client';
import { ProcessPage } from '../pages/process/process';
import { AuthProvider } from '../providers/auth/auth';
import { NativeAudio } from "@ionic-native/native-audio";
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    TabsPage,
    AuthPage,
    OrdersPage,
    OrderDetailPage,
    ArchiveOrdersPage,
    ProcessPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDx5KntwoWhXP7HFAMO7A-IzyBLljNiDao'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    TabsPage,
    AuthPage,
    OrdersPage,
    OrderDetailPage,
    ArchiveOrdersPage,
    ProcessPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DriverProvider,
    OrderProvider,
    ClientProvider,
    AuthProvider,
    NativeAudio,
    Geolocation
  ]
})
export class AppModule {}
