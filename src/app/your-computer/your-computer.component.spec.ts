import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourComputerComponent } from './your-computer.component';

describe('YourComputerComponent', () => {
  let component: YourComputerComponent;
  let fixture: ComponentFixture<YourComputerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourComputerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
