import { Component, OnInit, Injectable, Input, HostListener, ElementRef, NgZone, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ColumnsModal } from './ng-dt.modal';

@Component({
  selector: 'app-ng-datatable',
  templateUrl: './ng-datatable.component.html',
  styleUrl: './ng-datatable.component.scss'
})
@Injectable({
  providedIn:'root'
})
export class NgDatatableComponent implements OnInit {

  title = 'smartreport';
  @Input() columns:Array<ColumnsModal> = [];
  @Input() rows:Array<any> = [];
  @Input() totalRows:number=0;
  @Input() inputDigit:Array<any>=[];
  

//   @HostListener('scroll', ['$event'])
//   @ViewChild('scrollableDiv') scrollableDiv: ElementRef | undefined; 

  first:number = 1;
  last:number = 10;
  limit: number = 10;
  showItemPerpage: number = 10;
  onPageScrollLoadData: number=10;
  // collection: string[] = [];
  p: any = 1;
  scrollLeft: number = 0;
  getshowPageItem:any;

  constructor(private elementRef: ElementRef, private ngZone: NgZone) {
    // this.paginationfun()
  }


  ngOnInit() {
    console.log("rows data", this.rows)
    console.log("columns", this.columns);
  }

  onChangeShowNumber(selectedValue: number) {
    this.showItemPerpage=selectedValue;
}

showMore() {
    this.onPageScrollLoadData += 100; // Increase the limit by 10 when the button is clicked
}
  
showLess(){
    this.onPageScrollLoadData -= 100; // Decrease the limit by 10 when the button is clicked
    if (this.onPageScrollLoadData < 0) {
      this.onPageScrollLoadData = 0; // Ensure the limit doesn't go below 0
    }
}

// ngAfterViewInit() {
//   if (this.scrollableDiv) {
//     this.scrollableDiv.nativeElement.addEventListener('scroll', this.divScroll.bind(this));
//   }
// }

divScroll(e:any) {
  this.ngZone.run(() => {
  // debugger;
    // if (this.scrollableDiv) {
    //   debugger;
    //   this.scrollLeft = this.scrollableDiv.nativeElement.scrollLeft;
    // }

    // if (this.scrollableDiv) {
    //   let currentScrollLeft = this.scrollableDiv.nativeElement.scrollLeft;
    //   // Scrolled to the right
    //   if (this.scrollLeft > currentScrollLeft) {
    //    // this.onPageScrollLoadData += 10;
    //     this.scrollLeft = currentScrollLeft;
    //     this.onPageScrollLoadData += 10;
    //   } 
    //    // Scrolled to the left
    //   if (this.scrollLeft < currentScrollLeft) {        
    //   //  this.onPageScrollLoadData -= 10;       
    //     this.scrollLeft = currentScrollLeft;
    //     this.onPageScrollLoadData -= 10;
    //   }
    // }

  });
}

}
