import { TestBed } from '@angular/core/testing';
import { NgDatatableComponent } from './ng-datatable.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgDatatableComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(NgDatatableComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'smartreport' title`, () => {
    const fixture = TestBed.createComponent(NgDatatableComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('smartreport');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(NgDatatableComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, smartreport');
  });
});
