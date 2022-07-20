import { TestBed } from '@angular/core/testing';

import { PropertySetterService } from './property-setter.service';

describe('PropertySetterService', () => {
  let service: PropertySetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertySetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
