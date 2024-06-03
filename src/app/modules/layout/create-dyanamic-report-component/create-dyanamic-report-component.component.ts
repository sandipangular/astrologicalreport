import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

import { DynamicComponentService } from '../../services/DynamicComponentService';

@Component({
  selector: 'app-create-dyanamic-report-component',
  templateUrl: './create-dyanamic-report-component.component.html',
  styleUrls: ['./create-dyanamic-report-component.component.scss']
})
export class CreateDyanamicReportComponentComponent {

  createmenuForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: BsModalService, // Inject BsModalService instead of BsModalRef
    private dynamicComponentService: DynamicComponentService
  ) {
    this.createmenuForm = this.formBuilder.group({
      menuname: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.createmenuForm.valid) {
      let componentName = this.createmenuForm.get('menuname')?.value;
      let folderName = 'modules/layout/reports'; // Corrected folder name
      this.dynamicComponentService.createComponentInFolder(folderName, componentName);
    }
  }

  closeModal() {
    // Close modal using modal service
    // This assumes you're opening the modal using modal service elsewhere
    this.modalService.hide();
  }
}
