import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { AuthPage } from '../auth/auth';
import { DriverProvider } from '../../providers/driver/driver';
import {AuthProvider} from "../../providers/auth/auth";
import {Driver} from "../../models/driver.model";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public user: Driver = {} as Driver;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private driverProvider: DriverProvider,
    public app: App,
    private auth$: AuthProvider
  ) {
    this.getData();
  }

  getData() {
      this.driverProvider.getById(this.auth$.userid)
        .then((data: Driver) => this.user = data);
  }

  ionViewDidEnter() {
    this.getData();
  }

  logout() {
    this.auth$.logout();
    this.app.getRootNav().setRoot(AuthPage);
  }

}
