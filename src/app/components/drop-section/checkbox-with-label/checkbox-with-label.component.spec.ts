import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxWithLabelComponent } from './checkbox-with-label.component';

describe('CheckboxWithLabelComponent', () => {
  let component: CheckboxWithLabelComponent;
  let fixture: ComponentFixture<CheckboxWithLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxWithLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxWithLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
