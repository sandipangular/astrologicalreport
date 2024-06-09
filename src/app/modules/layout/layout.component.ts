import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../core/services/store.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  menuList: any[] = [];
  isCollapsed: boolean = false;
  value:any;
  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.loadData();
  }
 
  loadData() {
    this.localStorageService.getArray().subscribe(storedMenuItems => {
      this.menuList = storedMenuItems;
    });
  }
  handleValueChange(value: any) {
    this.isCollapsed = !this.isCollapsed;
  }
}
