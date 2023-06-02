import { Component } from '@angular/core';
import { Observer } from 'rxjs';
import { ResponseBody, ResponseDataOptions } from '../../types';
import { LoadingService, RestService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public url: string = "https://www.ekcs.co";
  public selectedFile: File | null = null;
  public responseData: ResponseDataOptions = {};
  public colorChooser: string | null = null;

  constructor(
    private restService: RestService,
    private loadingService: LoadingService
  ) { }

  public onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  public onColorChoose(color: string, index: number) {
    const rgb = this.hexToRgb(color);
    if (this.responseData.colors)
      this.responseData.colors[index] = rgb;
  }

  private urlFetchHandler(): Partial<Observer<unknown>> {
    return {
      next: (response: any) => {
        this.loadingService.setLoading(false);
        const data = response as ResponseBody;
        this.responseData = data.data;
        console.log({ data });
      },
      error: (error: Error) => {
        this.loadingService.setLoading(false);
        console.log("error: ", error);
      }
    }
  }

  private hexToRgb(hex: string): number[] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [];
  }

  public pushColorProp(color: string): void {
    if (!this.responseData.colors) this.responseData.colors = [];
    this.responseData.colors.push(this.hexToRgb(color));
  }

  public generateColor(colorArray: number[]): string {
    const [R, G, B] = colorArray;
    return this.rgbToHex(R, G, B);
  }

  public rgbToHex(r: number, g: number, b: number): string {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
  }

  private fileUploadHandler(): Partial<Observer<unknown>> {
    return {
      next: (response: any) => {
        this.loadingService.setLoading(false);
        const data = response as ResponseBody;
        this.responseData.logo = data.data.fileUrl;
        this.responseData.colors = data.data.colors;
        console.log({ data });
      },
      error: (error: Error) => {
        this.loadingService.setLoading(false);
        console.log("error: ", error);
      }
    }
  }

  public async onSubmit() {
    let url: URL;
    if (!this.url) alert("URL not specified");
    try {
      url = new URL(this.url);
    } catch (error) {
      return alert("Input url is not valid.");
    }
    this.loadingService.setLoading(true);
    this.responseData = {};
    this.restService.get("/scrapper".concat(`?url=${this.url}`)).subscribe(this.urlFetchHandler());
  }

  public async onUpload() {
    if (this.selectedFile) {
      this.loadingService.setLoading(true);
      this.restService.fileUpload('/file/upload', this.selectedFile).subscribe(this.fileUploadHandler());
    }
  }

  public setValue(key: string, value: any): void {
    switch (key) {
      case 'about': this.responseData.about = value;
        break;
      case 'keywords': this.responseData.keywords = value;
        break;
      case 'title': this.responseData.title = value;
        break;
      default: return;
    }
  }

  public async finalSubmit() {
    const data: Record<string, any> = { ...this.responseData };
    data['title'] = data['about'];
    data['url'] = this.url;
    console.log("response: ", this.responseData);
    this.loadingService.setLoading(true);
    this.restService.post("/scrapper", data).subscribe({
      next: (response: any) => {
        console.log({ response });
        this.loadingService.setLoading(false);
      },
      error: (error: Error) => {
        console.log("error: ", error);
        this.loadingService.setLoading(false);
      }
    });
  }
}
