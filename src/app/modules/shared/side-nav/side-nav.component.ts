import { Component } from '@angular/core';
import menuList from '../../../configuration/sideNavMenu.json'
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  menuList:Array<any>=[
    // {
    //   name:"Report",
    //   icon:"",
    //   link:""
    // }
  ]
  constructor(){
    // console.log(this.menuList)
    this.menuList=menuList['admin'];
  }
}
