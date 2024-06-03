import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDyanamicReportComponentComponent } from './create-dyanamic-report-component.component';

describe('CreateDyanamicReportComponentComponent', () => {
  let component: CreateDyanamicReportComponentComponent;
  let fixture: ComponentFixture<CreateDyanamicReportComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDyanamicReportComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDyanamicReportComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
