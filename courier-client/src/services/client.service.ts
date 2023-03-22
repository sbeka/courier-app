import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';

@Injectable()
export class ClientService {

  private api = 'http://localhost:3000/api/clients';

  constructor(public http: HttpClient) {
  }

  regClient(client: Client) {
    return this.http.post(this.api, client);
  }

  getUserByLoginAndPassword(login: string, password: string) {
    let filter = {
        where: {
          and: [
            { login: login },
            { password: password }
          ]
        }
      };
    return this.http.get(this.api+'/?filter='+JSON.stringify(filter));
  }

  getById(id: string) {
    let url = this.api+'/'+id;
    return this.http.get(url);
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
