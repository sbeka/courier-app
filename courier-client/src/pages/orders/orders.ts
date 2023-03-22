import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { OrderDetailPage } from '../order-detail/order-detail';

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage implements OnInit {

  status: string = 'Свободен';

  freeOrders: Order[];
  inprocessOrders: Order[];
  completedOrders: Order[];


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private orderService: OrderService
  ) {
    this.freeOrders = [];
    this.inprocessOrders = [];
    this.completedOrders = [];
  }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getOrdersByStatus('Свободен').subscribe((data: Order[]) => this.freeOrders = data);
    this.orderService.getOrdersByStatus('Выполняется').subscribe((data: Order[]) => this.inprocessOrders = data);
    this.orderService.getOrdersByStatus('Завершено').subscribe((data: Order[]) => this.completedOrders = data);
  }

  showDetail(order: Order) {
    this.navCtrl.push(OrderDetailPage, order);
  }

  refresh() {
    this.getAllOrders();
  }
  
  loader: any;
  
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Пожалуйста, подождите..."
    });
    this.loader.present();
  }

}
