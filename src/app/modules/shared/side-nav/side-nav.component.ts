import { Component } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  menuList:Array<any>=[
    {
      menuname:"Report",
      icon:"",
      link:""
    }
  ]
  constructor(){
    // console.log(this.menuList)
  }
}
