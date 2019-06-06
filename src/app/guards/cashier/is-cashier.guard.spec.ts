import { TestBed, async, inject } from '@angular/core/testing';

import { IsCashierGuard } from './is-cashier.guard';

describe('IsCashierGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsCashierGuard]
    });
  });

  it('should ...', inject([IsCashierGuard], (guard: IsCashierGuard) => {
    expect(guard).toBeTruthy();
  }));
});
