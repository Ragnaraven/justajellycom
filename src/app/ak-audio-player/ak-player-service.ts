import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import * as moment from "moment";
import { Playlist, Song } from './AkPlayer';
import { HttpClient } from '@angular/common/http';

export enum PlayState {
  Paused,
  Playing,
}

export enum LoopState {
  Off,
  One,
  Infinite,
}

export enum VolumeState {
  Muted,
  Low,
  High,
}

export interface StreamState {
  playState: PlayState;
  loopState: LoopState;
  volumeState: VolumeState;
  shuffle: boolean;

  readableCurrentTime: string;
  readableDuration: string;
  duration: number | undefined;
  currentTime: number | undefined;
  canplay: boolean;
  error: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AkPlayerService {

  private state: StreamState = {
    playState: PlayState.Paused,
    loopState: LoopState.Off,
    volumeState: VolumeState.High,
    shuffle: false,

    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false,
  };

  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject( this.state  );

  private resetState() {
    this.state = {
      playState: PlayState.Paused,
      loopState: LoopState.Off,
      volumeState: VolumeState.Low,
      shuffle: false,

      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      canplay: false,
      error: false,
    };
  }
  
  getState(): Observable<StreamState> {
    return this.stateChange.asObservable();
  }

  private stop$ = new Subject();
  private audioObj = new Audio();
  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];
  
  private playStream(url: any): Observable<unknown> {
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }

  private streamObservable(url: string) {
    return new Observable(observer => {
      // Play audio
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();
  
      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };
  
      this.addEvents(this.audioObj, this.audioEvents, handler);
      return () => {
        // Stop Playing
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        // remove event listeners
        this.removeEvents(this.audioObj, this.audioEvents, handler);
        // reset state
        this.resetState();
      };
    });
  } 

  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case "canplay":
        this.state.duration = this.audioObj.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay = true;
        break;
      case "playing":
        this.state.playState = PlayState.Playing;
        break;
      case "pause":
        this.state.playState = PlayState.Paused;
        break;
      case "timeupdate":
        this.state.currentTime = this.audioObj.currentTime;
        this.state.readableCurrentTime = this.formatTime(
          this.state.currentTime
        );
        break;
      case "error":
        this.resetState();
        this.state.error = true;
        break;        
      case "ended":
        this.nextSong();
        break;
    }
    this.stateChange.next(this.state);
  }
  
  private addEvents(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.removeEventListener(event, handler);
    });
  }

  public playlist: Playlist = new Playlist();

  constructor(
    private http: HttpClient
    ) 
  {
      this.http.get<Song[]>('assets/library/songdb.json').subscribe(
        (songList: Song[]) => {
          this.playlist.addSongs(...songList);
          this.playSongIndex(0);
          this.pause();
      }); 

  }

  public get currentSong(): Song | undefined { return this.playlist.current; }

  public get isShuffleOn(): boolean { return this.state.shuffle; }

  public get isPlaying(): boolean { return this.state.playState == PlayState.Playing; }
  public get isPaused(): boolean { return this.state.playState == PlayState.Paused; }
  
  public get isNotLooping(): boolean { return this.state.loopState == LoopState.Off; }
  public get isLoopingOne(): boolean { return this.state.loopState == LoopState.One; }
  public get isLoopingInfinite(): boolean { return this.state.loopState == LoopState.Infinite; }

  public get isVolumeMuted(): boolean { return this.state.volumeState == VolumeState.Muted; }
  public get isVolumeLow():   boolean { return this.state.volumeState == VolumeState.Low; }
  public get isVolumeHigh():  boolean { return this.state.volumeState == VolumeState.High; }

  public get readableCurrentTime(): string { return this.state.readableCurrentTime !== undefined && this.state.readableCurrentTime !== '' ? this.state.readableCurrentTime : "-"; }
  public get readableDuration(): string {    return this.state.readableDuration    !== undefined && this.state.readableDuration    !== '' ? this.state.readableDuration : "-"; }

  public get volume(): number { return this.audioObj.volume; }

  
  public toggleShuffle () {
    this.state.shuffle = !this.state.shuffle;
  }

  public lastSong() {
    this.pause();
    this.playlist.playLast(true);
    this.playSongIndex(this.playlist.currentIndex);
  }

  public nextSong() {
    this.pause();
    this.playlist.playNext(true);
    this.playSongIndex(this.playlist.currentIndex);
  }

  public play() {
    this.audioObj.play();
  }

  public pause() {
    this.audioObj.pause();
  }

  public stop() {
    this.stop$.next(undefined);
  }

  public seekTo(seconds: number) {
    this.audioObj.currentTime = seconds;
  }

  //Interface methods
  public togglePlay() {
    if(this.state.playState == PlayState.Paused) {
      //this.state.playState = PlayState.Playing; State handled in updateState method.
      this.play();
    }
    else if(this.state.playState == PlayState.Playing) {
      //this.state.playState = PlayState.Paused; State handled in updateState method.
      this.pause();
    }
  }

  public toggleRepeat() {
    if(this.state.loopState == LoopState.Off)
      this.state.loopState = LoopState.One;
    else if(this.state.loopState == LoopState.One)
      this.state.loopState = LoopState.Infinite;
    else if(this.state.loopState == LoopState.Infinite)
      this.state.loopState = LoopState.Off;      
  }

  public changeVolume (value: number) {
    this.audioObj.volume = value;

    if(value == 0)
      this.state.volumeState = VolumeState.Muted;
    else if(value < 0.6)
      this.state.volumeState = VolumeState.Low;
    else if(value >= 0.6)
        this.state.volumeState = VolumeState.High;

    this.stateChange.next(this.state);
  }

  public playbackScrub (value: number) {
    const momentTime = (this.state?.duration ?? 0);
    this.seekTo(momentTime * value);
  }

  public playSong(song: Song) {
    this.pause();

    this.playlist.playSong(song);
    this.playCurrent();
  }

  public playSongIndex(index: number) {
    this.pause();

    this.playlist.playAtIndex(index);
    this.playCurrent();
  }

  private playCurrent () {
    if(this.playlist.current)
      this.playStream("assets/library/" + this.playlist.current?.filename).subscribe(playstate => this.playstateChange(playstate));
  }

  public playstateChange (playstate: any) {

  }

  public formatTime(time: number, format: string = "m:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }
}
