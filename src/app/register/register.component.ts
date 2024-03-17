import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
  AsyncValidatorFn,
  ValidationErrors,
  FormBuilder,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  //global variables ---------------------------------------------------------------------------------
  form!: FormGroup;
  name: any;
  password: any;
  email: any;

  //constructor --------------------------------------------------------------------------------------
  constructor(private user: UserService, private router: Router,private fb:FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*@%$#])[A-Za-z\d*@%$#]{8,}$/
        ),
      ]),
      confirm_password: new FormControl(null, [Validators.required], [this.passwordMatchValidator()]),
      image: new FormControl(null, [Validators.required, this.imageValidatorFn]),
    });
  }

  register() {

    const formData = new FormData();
    const imageInput = document.querySelector('input[id="image"]') as HTMLInputElement | null;
    if (imageInput && imageInput.files && imageInput.files.length > 0) {
      const file = imageInput.files[0];
      formData.append('image', file, file.name);
    }
    formData.set('name', this.name);
    formData.set('email', this.email);
    formData.set('password', this.password);

    this.user.register( formData).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Congrats.',
          text: 'Thanks For Register',
        });
        this.router.navigate(['/login']);
      },
      (err) => {
        if (err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          });
      }
    );
  }

    //custom validator for confirm password
  passwordMatchValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Promise<{ [key: string]: any } | null> => {
      return new Promise((resolve) => {
        const password = this.form.get('password')?.value;
        const confirm_password = control.value;
        if (password !== confirm_password) {
          resolve({ equalTo: true });
        } else {
          resolve(null);
        }
      });
    };
  }

  //custom validator for image
  imageValidatorFn(control: AbstractControl): ValidationErrors | null {
    const input = document.querySelector('input[id="image"]');
    if (input instanceof HTMLInputElement && input.files) {
      const files = input.files;
      if (files.length < 1) {
        return { fileCount: true };
      }
    }
    return null;
  }
}
