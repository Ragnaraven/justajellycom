import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AkAudioPlayerModule } from './ak-audio-player/ak-audio-player.module';
import { HttpClientModule } from '@angular/common/http';
import { SongOptionComponent } from './song-option/song-option.component';

@NgModule({
  declarations: [
    AppComponent,
    SongOptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AkAudioPlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
