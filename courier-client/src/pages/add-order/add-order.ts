import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Order } from '../../models/order.model';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'page-add-order',
  templateUrl: 'add-order.html',
})
export class AddOrderPage {

  private login: string = localStorage.getItem('login');
  public user: Client;
  public order = {} as Order;


  public lat: number = 43.238949;
  public lon: number = 76.889709;

  //Marker
  public marker: boolean = false;
  public markerLat: number = 0;
  public markerLng: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clientService: ClientService,
    private orderService: OrderService,
    public alertCtrl: AlertController
  ) {
    this.clientService.getByLogin(this.login).subscribe((data: Client) => this.user = data);
  }

  addOrder() {
    this.order.clientid = this.user.login;
    this.order.status = "Свободен";
    this.orderService.addOrder(this.order).subscribe(
      success => {
        this.showAlert("Сәтті", "Сіздің тапсырысыңыз сәтті қосылды!");
        this.order = {
          pointa: '',
          pointb: '',
          status: '',
          clientid: '',
          driverid: '',
          desc: '',
          price: null,
          coor: '',
        };
      },
      error => this.showAlert("Қате", "Қате орын алды. Кейінірек қайталап көріңіз")
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


  placeMarker($event) {
    this.marker = true;
    this.markerLat = Number($event.coords.lat);
    this.markerLng = Number($event.coords.lng);
    //Add to model
    this.order.coor = this.markerLat+','+this.markerLng;
  }
}
