import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { Order } from '../../models/order.model';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-process',
  templateUrl: 'process.html',
})
export class ProcessPage {

  public order: Order;
  public lat: number = 43.238949;
  public lon: number = 76.889709;

  markerLat = 0;
  markerLng = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private orderProvider: OrderProvider,
    public app: App
  ) {
    this.order = this.orderProvider.selected;
    console.log(this.order);

    if (this.order.coor) {
      const res = this.order.coor.split(',');
      this.lat = Number(res[0]);
      this.lon = Number(res[1]);
      this.markerLat = Number(res[0]);
      this.markerLng = Number(res[1]);
    }
  }


  completedOrder() {
    this.orderProvider
      .setStatus(this.order.id, "Завершено")
      .subscribe(() => this.app.getRootNav().setRoot(TabsPage));
  }

  cancelOrder() {
    this.orderProvider
      .setStatus(this.order.id, "Свободен")
      .subscribe(() => {
        localStorage.removeItem('haveOrderID');
        this.app.getRootNav().setRoot(TabsPage);
      });
  }

}
