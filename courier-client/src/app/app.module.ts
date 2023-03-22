import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AgmCoreModule } from '@agm/core';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { ClientService } from '../services/client.service';
import { HttpClientModule } from '@angular/common/http';
import { OrdersPage } from '../pages/orders/orders';
import { OrderService } from '../services/order.service';
import { OrderDetailPage } from '../pages/order-detail/order-detail';
import { RegPage } from '../pages/reg/reg';
import { AddOrderPage } from '../pages/add-order/add-order';
import {DriverService} from "../services/driver.service";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    LoginPage,
    OrdersPage,
    OrderDetailPage,
    RegPage,
    AddOrderPage
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
    AboutPage,
    HomePage,
    TabsPage,
    LoginPage,
    OrdersPage,
    OrderDetailPage,
    RegPage,
    AddOrderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ClientService,
    OrderService,
    DriverService
  ]
})
export class AppModule {}
