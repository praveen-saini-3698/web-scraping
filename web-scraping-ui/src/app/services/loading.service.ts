import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isVisible: boolean = false;
  constructor() { }

  public setLoading(value: boolean): void {
    this.isVisible = value;
    return;
  }

  public getLoading(): boolean {
    return this.isVisible;
  }
}
