import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrderDetailPage } from '../order-detail/order-detail';
import { OrderProvider } from '../../providers/order/order';

@Component({
  selector: 'page-archive-orders',
  templateUrl: 'archive-orders.html',
})
export class ArchiveOrdersPage {

  public orders: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private orderProvider: OrderProvider
  ) {

  }

  ionViewDidEnter() {
    this.doRefresh();
  }

  showDetail(order) {
    this.orderProvider.selected = order;
    this.navCtrl.push(OrderDetailPage);
  }


  doRefresh(refresher = null) {
    this.orderProvider
      .getArchiveOrders()
      .subscribe(orders => {
        this.orders = orders;
        if (refresher !== null) refresher.complete();
      });
  }


}
