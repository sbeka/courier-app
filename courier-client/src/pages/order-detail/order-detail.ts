import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { OrdersPage } from '../orders/orders';
import {DriverService} from "../../services/driver.service";
import {DriverModel} from "../../models/driver.model";

@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {

  order: Order;
  driver: DriverModel;

  lat: number = 43.225444;
  lon: number = 76.907240;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private orderService: OrderService,
    public alertCtrl: AlertController,
    private driver$: DriverService
  ) {
    this.order = this.navParams.data;
  }


  deleteOrder(id: string) {
    this.orderService.deleteOrder(id).subscribe(
      success => {
        this.showAlert("Успешно", "Заказ успешно удалено!");
        this.navCtrl.push(OrdersPage);
      },
      error => this.showAlert("Ошибка", "Произошла ошибка. Побробуйте позднее.")
    );
  }


  showAlert(title, msg) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
