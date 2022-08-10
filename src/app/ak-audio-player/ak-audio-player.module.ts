import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AkPlayerComponent } from './ak-player/ak-player.component';

@NgModule({
  declarations: [
    AkPlayerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AkPlayerComponent
  ]
})
export class AkAudioPlayerModule { }
