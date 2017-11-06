import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import * as firebase from 'firebase';
import { EqualValidator } from './equal-validator.directive';
import { async } from 'q';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  error: any
  userForm: FormGroup;
  newUser: boolean = true; // to toggle login or signup form
  passReset: boolean = false;
  constructor(private fb: FormBuilder, private auth: AuthService) {}
  
   ngOnInit(): void {
     this.buildForm();
   }
   toggleForm(): void {
     this.newUser = !this.newUser;
   }
   signup(form: NgForm): void {
    const value = form.value;
    this.auth.createUser(value.email, value.password)
   }

   async login(form: NgForm) {
    const value = form.value; 
    
    this.error = await this.auth.signinUser(value.email, value.password)
   }

  //  resetPassword() {
  //    this.auth.resetPassword(this.userForm.value['email'])
  //    .then(() => this.passReset = true)
  //  }

   buildForm(): void {
     this.userForm = this.fb.group({
       'email': ['', [
          Validators.required,
          Validators.email
         ]
       ],
       'signUpEmailConfirm': ['', [
          Validators.required,
          Validators.email,
          EqualValidator
      ]
    ],
       'password': ['', [
         Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
         Validators.minLength(6),
         Validators.maxLength(25)
       ]
     ],
     }, {
          validator: EqualValidator.MatchEmail
      });
     this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
     this.onValueChanged(); // reset validation messages
   }

   // Updates validation state on form changes.
   onValueChanged(data?: any) {
     if (!this.userForm) { return; }
     const form = this.userForm;
     for (const field in this.formErrors) {
       // clear previous error message (if any)
       this.formErrors[field] = '';
       const control = form.get(field);
       if (control && control.dirty && !control.valid) {
         const messages = this.validationMessages[field];
         for (const key in control.errors) {
           this.formErrors[field] += messages[key] + ' ';
         }
       }
     }
   }

  formErrors = {
     'email': '',
     'password': '',
     'signUpEmailConfirm': ''
   };

   validationMessages = {
     'email': {
       'required':      'Email is required.',
       'email':         'Email must be a valid email'
     },
     'password': {
       'required':      'Password is required.',
       'pattern':       'Password must be include at one letter and one number.',
       'minlength':     'Password must be at least 6 characters long.',
       'maxlength':     'Password cannot be more than 40 characters long.',
     },
     'signUpEmailConfirm': {
       'required':      'Confirm Email is required',
       'MatchEmail':    'Email must match' 
     }
   };

}
