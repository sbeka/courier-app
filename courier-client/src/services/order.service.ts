import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable()
export class OrderService {

  private api = 'http://localhost:3000/api/orders';

  public selected: Order;

  constructor(
    public http: HttpClient
  ) {

  }

  getOrdersByStatus(status: string) {
    let client = localStorage.getItem('login');
    let filter = {
      where: {
        status: status,
        clientid: client
      },
      order: "id DESC"
    };
    return this.http.get(this.api+'?filter='+JSON.stringify(filter));
  }

  getById(id: string) {
    let url = this.api+'/'+id;
    return this.http.get(url);
  }

  addOrder(order: Order) {
    return this.http.post( this.api, order);
  }

  deleteOrder(orderid: string) {
    let url = this.api+'/'+orderid;
    return this.http.delete(url);
  }

}
