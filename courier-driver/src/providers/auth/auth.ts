import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Driver} from "../../models/driver.model";
import {DriverProvider} from "../driver/driver";

@Injectable()
export class AuthProvider {

  public authorized: boolean = false;
  public userid: string = null;

  constructor(
    public http: HttpClient,
    private driver$: DriverProvider)
  {
    if (localStorage.getItem('userid') != 'null') {
      this.setStatus(true, localStorage.getItem('userid'));
    }
  }

  auth(username, password) {
    let promise = new Promise((resolve, reject) => {
      this.driver$.getUserByLoginAndPassword(username, password)
        .subscribe(
          (data: Driver) => {
            this.setStatus(true, data.id);
            resolve(data);
          },
          error => reject(error)
        );
    });
    return promise;
  }

  logout() {
    localStorage.removeItem('userid');
    this.setStatus(false, null);
  }

  setStatus(status: boolean, userid: string) {
    localStorage.setItem('userid', userid);
    this.authorized = status;
    this.userid = userid;
  }

  setCoor(coors: any) {
    let coor = coors.coords.latitude+","+coors.coords.longitude;
    let toSave = { coor: coor };
    return this.driver$.setCoor(toSave, this.userid);
  }

}
