import { Component, Input, OnInit } from '@angular/core';
import { AkPlayerService } from '../ak-audio-player/ak-player-service';
import { Song } from '../ak-audio-player/AkPlayer';

@Component({
  selector: 'app-song-option',
  templateUrl: './song-option.component.html',
  styleUrls: ['./song-option.component.scss']
})
export class SongOptionComponent implements OnInit {

  @Input() showAlbumName = false;
  @Input() nullImageFallback = "assets/justajelly-icon.svg";

  @Input() song: Song = {};
  @Input() index: number = 0;

  constructor(
    public akPlayerService: AkPlayerService
  ) { }

  ngOnInit(): void {
  }

  playSong(song: Song) {
    this.akPlayerService.playSong(song);
  }
}
