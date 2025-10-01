import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Declarativo } from './declarativo';

describe('Declarativo', () => {
  let component: Declarativo;
  let fixture: ComponentFixture<Declarativo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Declarativo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Declarativo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
