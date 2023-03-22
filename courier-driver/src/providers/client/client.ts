import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ClientProvider {

  private api = 'http://localhost:3000/api/clients/';

  constructor(public http: HttpClient) {

  }

  getAll() {
    return this.http.get(this.api);
  }

  getByLogin(login: string) {
    let filter = {
      where: {
        login: login
      }
    };
    let url = this.api+'findOne?filter='+JSON.stringify(filter);
    return this.http.get(url);
  }

  getById(id: string) {
    return this.http.get(this.api+id).toPromise().catch(e => console.log(e.message));
  }

}
