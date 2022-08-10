import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AkPlayerService } from './ak-audio-player/ak-player-service';
import { Song } from './ak-audio-player/AkPlayer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showAlbumName = false;
  nullImageFallback = "assets/justajelly-icon.svg";

  constructor(
    public akPlayerService: AkPlayerService
  ) 
  {

  }

  smoothScrollToAnchor(anchor: string) {
    document.getElementById(anchor)?.scrollIntoView({behavior: 'smooth' });
  }
 
  //https://www.syncfusion.com/blogs/post/easy-steps-to-host-an-angular-app-in-github-pages.aspx
  
}
 