import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { OrdersPage } from '../orders/orders';
import { AddOrderPage } from '../add-order/add-order';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = OrdersPage;
  tab4Root = AddOrderPage;

  constructor() {

  }
}
