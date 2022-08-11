import { Component, HostListener } from '@angular/core';
import { AkPlayerService } from './ak-audio-player/ak-player-service';
import { ResizeService } from './resize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showAlbumName = false;
  nullImageFallback = "assets/justajelly-icon.svg";

  constructor(
    public aspectRatio: ResizeService,
    public akPlayerService: AkPlayerService
  ) 
  {
  }

  smoothScrollToAnchor(anchor: string) {
    document.getElementById(anchor)?.scrollIntoView({behavior: 'smooth' });
  }

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.aspectRatio.onResize(event.target.innerWidth / event.target.innerHeight);
	}
 
  //https://www.syncfusion.com/blogs/post/easy-steps-to-host-an-angular-app-in-github-pages.aspx
  
}
 