import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AkPlayerService } from '../ak-player-service';
import { Song } from '../AkPlayer';

let TestSong: Song = {
  id: 0,
  filename: "assets/Waltz.mp3",
  name: "Waltz",
  album: "Just A Jelly",
  artist: "Aidan McKenna",
  date: new Date(),
  image: undefined
};

@Component({
  selector: 'ak-player',
  templateUrl: './ak-player.component.html',
  styleUrls: ['./ak-player.component.scss']
})
export class AkPlayerComponent implements OnInit {
  
  @Output() currentSong: Song | undefined = TestSong;

  @Input() showAlbumName = false;
  @Input() nullImageFallback ?: string;

  lastSongActive = false;
  nextSongActive = false;
  playPauseActive = false;
  toggleRepeatActive = false; 

  currentPlayTime = "0:00";
  songLength = "0:00";

  constructor(
    public akPlayerService: AkPlayerService,

  ) { }

  ngOnInit(): void {
  }

  playbackChange(event: any) {
    this.akPlayerService.playbackScrub(event.target.value / 100);
  }

  volumeChange(event: any) {
    this.akPlayerService.changeVolume(event.target.value / 100);
  }

  tempTest() {
    let file = "localhost:4200/" + this.currentSong?.filename;
    console.log(file)
    this.akPlayerService.playStream(file);
  }
}
