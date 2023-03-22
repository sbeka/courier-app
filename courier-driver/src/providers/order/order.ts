import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../models/order.model';
import {AuthProvider} from "../auth/auth";
import {AlertController, App} from "ionic-angular";
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators";
import {ErrorModel} from "../../models/error.model";

@Injectable()
export class OrderProvider {

  private api = 'http://localhost:3000/api/orders';
  public selected: Order;
  public error: ErrorModel;

  constructor(
    public http: HttpClient,
    private auth$: AuthProvider,
    public app: App,
    public alertCtrl: AlertController
  ) {
    this.error = {
      status: false,
      message: ''
    };
  }

  getArchiveOrders(): Observable<Order[]> {
    let filter = {
      where: {
        status: "Завершено",
        driverid: this.auth$.userid
      },
      order: "id DESC"
    };
    return this.http
      .get(this.api+'?filter='+JSON.stringify(filter))
      .pipe(map((data: Order[]) => {
        return data;
      }));
  }

  getFreeOrders(type): Observable<Order[]> {
    let filter = {
      where: { status: type },
      order: "time DESC"
    };
    return this.http
      .get(this.api+'?filter='+JSON.stringify(filter))
      .pipe(map((data: Order[]) => {
        return data;
      }));
  }

  getById(id: string): Observable<Order> {
    let url = this.api+'/'+id;
    return this.http
      .get(url)
      .pipe(map((data: Order) => {
        return data;
      }));
  }

  setStatus(orderid: string, status: string): Observable<Order> {
    let url = this.api+'/'+orderid;
    let toSave = {
      driverid: this.auth$.userid,
      status: status,
      time: this.getDate()
    };
    return this.http
      .patch(url, toSave)
      .pipe(map((data: Order) => {
        return data;
      }));
  }

  getCurrentOrder() {
    let filter = {
      where: {
        and: [
          { driverid: this.auth$.userid },
          { status: "Выполняется" }
        ]
      }
    };
    let url = this.api+'/?filter='+JSON.stringify(filter);
    return this.http
      .get(url)
      .pipe(map((data: Order[]) => {
        return data;
      }));
  }

  private getDate(): number {
    let dd = new Date();
    return dd.getTime();
  }

  showError(error: HttpErrorResponse) {
    this.error = {
      status: error.ok,
      message: error.message
    };
  }

}
