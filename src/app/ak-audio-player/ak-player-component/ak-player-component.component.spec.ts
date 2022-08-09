import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AkPlayerComponentComponent } from './ak-player-component.component';

describe('AkPlayerComponentComponent', () => {
  let component: AkPlayerComponentComponent;
  let fixture: ComponentFixture<AkPlayerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AkPlayerComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AkPlayerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
