import { TestBed } from '@angular/core/testing';

import { TodosSignalService } from './todos-signal.service';

describe('TodosSignalService', () => {
  let service: TodosSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodosSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
