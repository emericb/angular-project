import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSuggestComponent } from './recipe-suggest.component';

describe('RecipeSuggestComponent', () => {
  let component: RecipeSuggestComponent;
  let fixture: ComponentFixture<RecipeSuggestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeSuggestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
