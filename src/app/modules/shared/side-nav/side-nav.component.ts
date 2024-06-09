import { Component } from '@angular/core';
import menuList from '../../../../assets/configuration/sideNavMenu.json'
import { LocalStorageService, SharedService } from '../../../core/services/store.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {

  menuList:any;
  storedMenuItems:any;
  constructor(private localStorageService: LocalStorageService,
    private sharedService: SharedService
  ) {
    this.sharedService.sharedData$.subscribe(sharedData => 
    this.localStorageService.addItem(sharedData));
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const initMenu = menuList.admin;
    this.localStorageService.getArray().subscribe(storedMenuItems => {
    //  console.log("storedMenuItems",storedMenuItems)
      this.menuList = [...initMenu, ...storedMenuItems];
    });
  }


}
