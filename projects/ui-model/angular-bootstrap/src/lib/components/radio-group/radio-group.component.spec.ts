/* tslint:disable:no-unused-variable */
import { RadioGroupComponent } from './radio-group.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('RadioGroupComponent', () => {
  let component: RadioGroupComponent<{}>;
  let fixture: ComponentFixture<RadioGroupComponent<{}>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RadioGroupComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
