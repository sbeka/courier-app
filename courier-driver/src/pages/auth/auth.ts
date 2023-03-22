import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {AuthProvider} from "../../providers/auth/auth";

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {

  public username: string = '';
  public password: string = '';

  loader: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private auth$: AuthProvider) {}

  auth() {
    this.presentLoading();
    this.auth$.auth(this.username, this.password)
      .then(d => {
        this.loader.dismiss();
        this.navCtrl.setRoot(TabsPage);
      })
      .catch(e => {
        this.loader.dismiss();
        this.showAlert();
      });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Қате!',
      subTitle: 'Логин немесе пароль дұрыс емес!',
      buttons: ['OK']
    });
    alert.present();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Өтінеміз, күте тұрыңыз..."
    });
    this.loader.present();
  }

}
