import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import { TabsPage } from '../tabs/tabs';
import { RegPage } from '../reg/reg';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public login: string = '';
  public password: string = '';


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private clientService: ClientService
  ) {
  }

  auth() {
    this.presentLoading();
    this.clientService.getUserByLoginAndPassword(this.login, this.password).subscribe((data: Client[]) => {
      if (data[0]) {
        localStorage.setItem('login', data[0].login);
        this.navCtrl.setRoot(TabsPage);
      }else{
        this.showAlert();
      }
      this.loader.dismiss();
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

  loader: any;

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Өтінеміз, күте тұрыңыз..."
    });
    this.loader.present();
  }

  openRegPage() {
    this.navCtrl.push(RegPage);
  }

}
