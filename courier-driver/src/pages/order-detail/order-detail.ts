import { Component } from '@angular/core';
import { NavController, App, AlertController } from 'ionic-angular';
import { OrderProvider } from '../../providers/order/order';
import { Order } from '../../models/order.model';
import { ProcessPage } from '../process/process';

@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {

  public order: Order;
  public status: string;

  public lat: number = 43.238949;
  public lon: number = 76.889709;

  markerLat = 0;
  markerLng = 0;

  constructor(
    public navCtrl: NavController,
    private orderProvider: OrderProvider,
    public app: App,
    public alertCtrl: AlertController,
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

    //ПРоверка заказа на доступность
    this.orderProvider
      .getById(this.order.id)
      .subscribe(data => {
        if (data.status != 'Свободен') {
          this.showAlert();
        }
      });
  }

  takeOrder() {
    //ПРоверка заказа на доступность
    this.orderProvider
      .getById(this.order.id)
      .subscribe(data => {
        if (data.status != 'Свободен') {
          this.showAlert();
          this.navCtrl.pop();
        }else{
          this.orderProvider
            .setStatus(this.order.id, "Выполняется")
            .subscribe(data => {
              if (data) this.app.getRootNav().setRoot(ProcessPage);
            });
        }
      });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Упс!',
      subTitle: 'Тапсырысты біреу алып қойды немесе тапсырыс жойылған',
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewWillLeave() {
    this.orderProvider.selected = undefined;
  }

}
