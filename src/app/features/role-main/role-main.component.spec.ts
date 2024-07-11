import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMainComponent } from './role-main.component';

describe('RoleMainComponent', () => {
  let component: RoleMainComponent;
  let fixture: ComponentFixture<RoleMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
