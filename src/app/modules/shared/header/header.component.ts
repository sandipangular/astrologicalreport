import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  @Output() valueChanged: EventEmitter<any> = new EventEmitter<any>();
 
  constructor(private router:Router) { 
  }
  logout(){  
    this.router.navigate(['login']);
  }
  emitValue(value: any) {
    this.valueChanged.emit(value);
  }
}
