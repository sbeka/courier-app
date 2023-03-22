import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DriverProvider {

  private api = 'http://localhost:3000/api/drivers';


  constructor(public http: HttpClient) {}

  getUserByLoginAndPassword(login: string, password: string) {
    let filter = {
        where: {
          and: [
            { login: login },
            { password: password }
          ]
        }
      };
    return this.http.get(this.api+'/findOne/?filter='+JSON.stringify(filter));
  }

  getById(id: string) {
    let url = this.api+'/'+id;
    return this.http.get(url).toPromise().catch(e => console.log(e.message));
  }

  getByLogin(login: string) {
    let filter = {
      where: {
        login: login
      }
    };
    let url = this.api+'/findOne?filter='+JSON.stringify(filter);
    return this.http.get(url);
  }

  setCoor(data: any, driverid: string) {
    return this.http.patch(this.api+'/'+driverid, data);
  }

}
