import { TestBed } from '@angular/core/testing';

import { StylesPickerService } from './styles-picker.service';

describe('StylesPickerService', () => {
  let service: StylesPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StylesPickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
