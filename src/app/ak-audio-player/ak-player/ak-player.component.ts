import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AkPlayerService, StreamState } from '../ak-player-service';
import { Song } from '../AkPlayer';

@Component({
  selector: 'ak-player',
  templateUrl: './ak-player.component.html',
  styleUrls: ['./ak-player.component.scss']
})
export class AkPlayerComponent implements OnInit {
  
  @Input() showAlbumName = false;
  @Input() nullImageFallback ?: string;

  lastSongActive = false;
  nextSongActive = false;
  playPauseActive = false;
  toggleRepeatActive = false; 

  streamState: StreamState | undefined;

  constructor(
    public akPlayerService: AkPlayerService,

  ) { }

  ngOnInit(): void {
    this.akPlayerService.getState().subscribe((streamState) => {
      this.streamState = streamState as unknown as StreamState;
    })
  }

  playbackChange(event: any) {
    this.akPlayerService.playbackScrub(event.target.value / 100);
  }

  volumeChange(event: any) {
    this.akPlayerService.changeVolume(event.target.value / 100);
  }

  getSongProgress(): number {
    console.log()
    return (
      (
        (
          (this.streamState?.currentTime ?? 0)
          / 
          (this.streamState?.duration ?? 1)
        )
        * 100 
      )
    )
    ?? 0;
  }
}
