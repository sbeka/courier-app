import { Component, ViewChild } from '@angular/core';
import { App, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

import { AuthPage } from '../pages/auth/auth';
import { TabsPage } from '../pages/tabs/tabs';
import { OrderProvider } from '../providers/order/order';
import { AuthProvider } from "../providers/auth/auth";
import { NativeAudio } from "@ionic-native/native-audio";
import { ProcessPage } from "../pages/process/process";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('myNav') nav: NavController

  public rootPage: any = this.auth$.authorized ? TabsPage : AuthPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public geolocation: Geolocation,
    private orderProvider: OrderProvider,
    private auth$: AuthProvider,
    private nativeAudio: NativeAudio,
    public app: App
  ) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    setInterval(() => {
      let currentPage = this.nav.getActive().component.name;
      this.checkOrder(currentPage);
    }, 5000);

    // let watch = this.geolocation.watchPosition();
    // watch.subscribe((data) => {
    //   this.auth$.setCoor(data).subscribe(d => console.log("Coordinates saved"));
    // });
  }

  //Функция для проверки есть ли заказ у пользователя или нет.
  //Если есть заказ то перенаправляем его в страницу выполнения заказа
  checkOrder(currentPage: string) {

    let haveOrderID = localStorage.getItem('haveOrderID');
    if (haveOrderID == undefined || haveOrderID == 'undefined') { //Если в памяти нет ID взятого заказа

      this.orderProvider
        .getCurrentOrder() //Получаем из сервера заказ текущего пользователя по статусу ВЫПОЛНЯЕТСЯ
        .subscribe(
          orders => {
            if (orders && orders.length > 0) { //Если такой заказ есть
              localStorage.setItem('haveOrderID', orders[0].id); //Сохраним в память
              this.orderProvider.selected = orders[0]; //Даем данные на сервис, чтобы страница мог взять данные
              if (currentPage != 'ProcessPage') {
                this.app.getRootNav().setRoot(ProcessPage);
                this.play();
              }
            }
          },
          error => this.orderProvider.showError(error)
        );//subscribe

    }else{ //Если в памяти есть ID взятого заказа (для проверки каждые 5 сек)

      this.orderProvider
        .getById(haveOrderID) //Получаем заказ из сервера по ID сохраненного в памяти
        .subscribe(
          order => {
            if (order.status == 'Выполняется') { //Если статус заказа РАВЕН "Выполняется"
              this.orderProvider.selected = order; //Даем данные на сервис, чтобы страница мог взять данные
              if (currentPage != 'ProcessPage') {
                this.app.getRootNav().setRoot(ProcessPage);
                this.play();
              }
            }else { //Если статус заказа НЕ равен "Выполняется"
              localStorage.removeItem('haveOrderID'); //Удаляем из памяти
              this.orderProvider.selected = undefined; //Сбросим сервис
              if (currentPage != 'TabsPage') this.app.getRootNav().setRoot(TabsPage);
            }
          },
          error => this.orderProvider.showError(error)
        );//subscribe

    }//end if
  }//checkorder


  play() {
    this.nativeAudio.preloadSimple('uniqueId1', 'assets/definite.mp3')
      .then(succ => console.log(succ), err => console.log(err));

    this.nativeAudio.play('uniqueId1')
      .then(succ => console.log(succ), err => console.log(err));
  }

}
