import { Component } from '@angular/core';
import { ProfilePage } from '../profile/profile';
import { OrdersPage } from '../orders/orders';
import { ArchiveOrdersPage } from '../archive-orders/archive-orders';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {


  tab1Root = ProfilePage;
  tab2Root = OrdersPage;
  tab3Root = ArchiveOrdersPage;

  constructor() {
  }
}
