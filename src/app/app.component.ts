import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AkPlayerService } from './ak-audio-player/ak-player-service';
import { Song } from './ak-audio-player/AkPlayer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showAlbumName = false;
  nullImageFallback = "assets/justajelly-icon.svg";

  public songList: Song[] = [];

  constructor(
    private http: HttpClient,
    public akPlayerService: AkPlayerService
  ) 
  {

  }

  ngOnInit(): void {
    this.http.get<Song[]>('assets/library/songdb.json').subscribe(
      (songList: Song[]) => {
        this.songList = songList;
    });
  }

  playSong(song: Song) {
    this.akPlayerService.playSong(song);
  }
 
  //https://www.syncfusion.com/blogs/post/easy-steps-to-host-an-angular-app-in-github-pages.aspx
  
}
 