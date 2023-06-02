import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(public loader: LoadingService) {

  }
}
