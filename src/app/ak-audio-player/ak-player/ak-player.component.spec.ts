import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AkPlayerComponent } from './ak-player.component';

describe('AkPlayerComponent', () => {
  let component: AkPlayerComponent;
  let fixture: ComponentFixture<AkPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AkPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AkPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
