import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResizeService {

  smallWidth = 650;
  wideWidth = 1000;

  private aspect_ratio = 16/9;
  
  constructor() { 
    this.aspect_ratio = window.innerWidth / window.innerHeight;
  }

  public onResize (aspectRatio: number) {
    this.aspect_ratio = aspectRatio;
  }

  public get aspectRatio (): number { return this.aspect_ratio; }
  public get isSmallWidth (): boolean { return window.innerWidth < this.smallWidth; }
  public get isWideWidth (): boolean { return window.innerWidth >= this.wideWidth; }
  public get isPortrait(): boolean { 
    return (this.aspect_ratio < 1 || this.isSmallWidth) && !this.isWideWidth;
  }
  public get isLandscape(): boolean { return !this.isPortrait }
}
