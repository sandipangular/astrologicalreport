import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LocalStorageService, SharedService } from '../../../core/services/store.service';

@Component({
  selector: 'app-create-dyanamic-report-component',
  templateUrl: './create-dyanamic-report-component.component.html',
  styleUrls: ['./create-dyanamic-report-component.component.scss']
})
export class CreateDyanamicReportComponentComponent {
  createmenuForm: FormGroup;
  submitted = false;
  menuItems:any;
  getLocalStorageArray:any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: BsModalService, // Inject BsModalService instead of BsModalRef
    private sharedService: SharedService
  ) {
    this.createmenuForm = this.formBuilder.group({
      menuname: ['', Validators.required],
    });
  }
  onSubmit() {
    this.submitted = true;

    const newItem = {
      name: this.createmenuForm.get('menuname')?.value,
      link: "new-item",
      icon: "",
      subMenu: [],
      subMenuOpened: false,
      arrow: "",
      roles: ""
    };

    this.sharedService.setData(newItem);
    this.modalService.hide();
  }

  closeModal() {
    this.modalService.hide();
  }
 
}
