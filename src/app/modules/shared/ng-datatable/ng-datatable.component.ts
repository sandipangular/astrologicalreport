import { Component, OnInit, Injectable, Input, HostListener, ElementRef, NgZone, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ColumnsModal } from './ng-dt.modal';
import { HttpClient } from '@angular/common/http';


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
  @Input() inputDigit:Array<any> = [];
  
  newRowsData:any;

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

  constructor(private elementRef: ElementRef, private ngZone: NgZone,
    private http:HttpClient,
  ) {
    // this.paginationfun();
  }


  ngOnInit() { 
   //console.log("columns", this.rows);
    //console.log("inputDigit Array",this.inputDigit);
  //  this.formattedData(this.rows)
  }
  // formattedData(rows:any){
  //   let updatedArray:any
  //   const [number,text] = rows.forEach((element:any,index:number) => { element[index].split('-')
  //     updatedArray.push({
  //       title: `id ${index}`,
  //       key:text
  //     });
  //   });
  //   return updatedArray
  // } 


  

  // reformatedData(flattenedArray:any){
  //   debugger;
  //   console.log("getSingleArray this.rows",this.rows)
  //   console.log("getSingleArray",flattenedArray)
  //   // var getSingleArray:any
  //   // for (let i = 0; i < flattenedArray.length; i++) {
  //   //   const [numbers, text] = flattenedArray[i].split('-'); 
  //   //   getSingleArray.push({
  //   //     title: `id ${i + 1}`,
  //   //     key:numbers
  //   //   });
  //   //   getSingleArray.push({
  //   //     title: `id ${i + 2}`,
  //   //     key:''
  //   //   });
  //   //   getSingleArray.push({
  //   //     title: `id ${i + 3}`,
  //   //     key:''
  //   //   });
  //   // }

  //   // console.log("getSingleArray",getSingleArray)
  // }

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
