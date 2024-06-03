import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  title = 'smartreport';
  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router:Router) { 
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get loginFormControl() {
    return this.loginForm.controls;
  }
  ngOnInit(): void {
   
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.router.navigate(['admin/reports']);
    } else {
      alert('Form is invalid');
      this.loginForm.markAllAsTouched();
    }
  }
}
