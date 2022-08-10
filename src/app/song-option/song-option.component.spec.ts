import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongOptionComponent } from './song-option.component';

describe('SongOptionComponent', () => {
  let component: SongOptionComponent;
  let fixture: ComponentFixture<SongOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
