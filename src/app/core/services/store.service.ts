import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  private sharedData: Subject<any> = new Subject<any>();
  sharedData$: Observable<any> = this.sharedData.asObservable();

  constructor() { }

  setData(updatedData:any) {
    this.sharedData.next(updatedData);
  }

}

export class LocalStorageService {
  private menuItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  menuItems$: Observable<any[]> = this.menuItemsSubject.asObservable();


  constructor() {
    this.loadInitialData();
  }

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  private loadInitialData() {
    if (this.isLocalStorageAvailable()) {
      const storedArray = localStorage.getItem('menuItems');
      const menuItems = storedArray ? JSON.parse(storedArray) : [];
      this.menuItemsSubject.next(menuItems);
    }
  }

  getArray(): Observable<any[]> {
    return this.menuItems$;
  }

  addItem(newItem: any): void {
    const currentItems = this.menuItemsSubject.value;
    const updatedItems = [...currentItems, newItem];
    this.menuItemsSubject.next(updatedItems);
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('menuItems', JSON.stringify(updatedItems));
    }
  }

  clearArray(): void {
    this.menuItemsSubject.next([]);
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('menuItems');
    }
  }
}
