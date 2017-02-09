import { Component } from '@angular/core';

import { AlertsPage, AssetsPage } from '../pages';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = AssetsPage;
  tab2Root: any = AlertsPage;
  
  constructor() {

  }
}
