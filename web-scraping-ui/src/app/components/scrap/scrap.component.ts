import { Component } from '@angular/core';
import { LoadingService, RestService } from 'src/app/services';

@Component({
  selector: 'app-scrap',
  templateUrl: './scrap.component.html',
  styleUrls: ['./scrap.component.scss']
})
export class ScrapComponent {
  public displayedColumns: string[] = [];
  public dataSource = [];

  constructor(
    private loadingService: LoadingService,
    private restService: RestService
  ) {
    this.fetchRecords();
  }

  public fetchRecords() {
    this.loadingService.setLoading(true);
    this.restService.get('/scrapper/all').subscribe({
      next: (response: any) => {
        this.loadingService.setLoading(false);
        const data = response.data;
        let keys: string[] = [];
        data.forEach((record: any) => Object.keys(record).length > keys.length ? keys = Object.keys(record) : undefined);
        console.log({ data, keys });
        this.displayedColumns = keys;
        this.dataSource = data;
      },
      error: (error: Error) => {
        this.loadingService.setLoading(false);
      }
    });
  }

}
