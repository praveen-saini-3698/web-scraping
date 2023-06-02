import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet><app-loader></app-loader></router-outlet>',
  styleUrls: []
})
export class AppComponent {
  title = 'web-scraping-ui';
}
