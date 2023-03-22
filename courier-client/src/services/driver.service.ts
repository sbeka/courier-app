import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DriverService {

  private api = 'http://localhost:3000/api/drivers';

  constructor(public http: HttpClient) {
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

}
