import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-reg',
  templateUrl: 'reg.html',
})
export class RegPage {

  public password2 = '';
  public user: Client = {
    login: '',
    password: '',
    lastname: '',
    firstname: '',
    phone: '',
    email: '',
    company: '',
    address: ''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private clientService: ClientService,
    public alertCtrl: AlertController
  ) {
  }

  reg() {
    if (this.user.login == "" ||
        this.user.password == "" ||
        this.user.lastname == "" ||
        this.user.firstname == "" ||
        this.user.phone == "" ||
        this.user.email == "" ||
        this.user.company == "" ||
        this.user.address == "" ||
        this.password2 == ""
      )
    {
      this.showAlert("Барлық өріс толтырылмады!", "Өтінеміз, барлық өрісті толтырыңыз!");
    }else{
      if (this.user.password == this.password2) {
        this.clientService.regClient(this.user).subscribe(
          success => {
            this.showAlert("Сәтті!", "Тіркелу сәтті өтті! Енді жүйеге кіре аласыз.");
            this.navCtrl.setRoot(LoginPage);
          },
          error => this.showAlert("Қате!", "Серверде қате болды. Кейінірек қайталап көріңіз.")
        );
      }else{
        this.showAlert("Пароль-дер сәйкес келмейді!", "Көрсетілген пароль-дер сәйкес келмейді");
      }
    }
  }


  showAlert(title, msg) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
