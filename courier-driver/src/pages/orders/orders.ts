import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { OrderDetailPage } from '../order-detail/order-detail';
import {Order} from "../../models/order.model";

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage implements OnInit{

  public orders: Order[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderProvider: OrderProvider
  ) {
    this.orders = [];
  }

  ngOnInit() {
    this.doRefresh();
  }

  showDetail(order) {
    this.orderProvider.selected = order;
    this.navCtrl.push(OrderDetailPage);
  }

  doRefresh(refresher = null) {
    this.orderProvider
      .getFreeOrders("Свободен")
      .subscribe(
        data => {
          this.orders = data;
          if (refresher !== null) refresher.complete();
          this.orderProvider.error = {
            status: false,
            message: ''
          };
        },
        error => {
          this.orderProvider.showError(error);
          if (refresher !== null) refresher.complete();
        }
      );
  }



}
