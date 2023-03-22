import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private login: string = localStorage.getItem('login');
  public user = {} as Client;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clientService: ClientService,
    public app: App
  ) {
    this.clientService.getByLogin(this.login).subscribe((data: Client) => this.user = data);
  }

  ionViewDidEnter() {
    this.clientService.getByLogin(this.login).subscribe((data: Client) => this.user = data);
  }

  logout() {
    localStorage.removeItem('login');
    this.app.getRootNav().setRoot(LoginPage);
  }

}
