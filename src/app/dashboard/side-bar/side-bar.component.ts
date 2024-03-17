import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { log } from 'console';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  //global variables ---------------------------------------------------------------------------------
  user!: any;
  form!: FormGroup;
  //update info form
  name: any;
  password: any;
  email: any;
  userInfo!:any;
  userId!:any;
  constructor(
    private fb: FormBuilder,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private user_ : UserService,
    private cookieService: CookieService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.fetchData();
    this.form = this.fb.group({
      password: new FormControl(null),
      email: [
        '',
        [
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      name: ['', [Validators.required, Validators.minLength(10)]],
    });

    // Subscribe to changes in the password field
    this.form.get('password')?.valueChanges.subscribe((value) => {
      // If the user has entered a value, apply the pattern validator
      if (value) {
        this.form.get('password')?.setValidators([
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*@%$#])[A-Za-z\d*@%$#]{8,}$/),
        ]);
      } else {
        // If the user has cleared the field, remove all validators
        this.form.get('password')?.clearValidators();
      }
      // Update the validation status
      this.form.get('password')?.updateValueAndValidity();
    });

    // Make all input fields touched to show errors after the form load
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  fetchData(){
    // this.user = JSON.parse(localStorage.getItem('user') || '[]');
    // console.log(this.user, this.user.id);
    this.userId = this.cookieService.get('userId');
    console.log(userId);
    this.user_.getUserById(this.userId).subscribe((res: any) => {
      (this.userInfo = res), console.log(this.userInfo);
    });
  }

  open(content: any) {
    this.name = this.userInfo.name;
    this.email = this.userInfo.email;
    this.modalService.open(content);
  }

  //update user info--------------------------------------------------------------------------------------------------
  updateInfo(pass:any) {
    const data = new FormData();
    const input = document.querySelector('input[type="file"]');
    if (input instanceof HTMLInputElement && input.files) {
      const files = input.files;
      if(files.length>0){
        data.append('image', files[0], files[0].name);
    }}


    if(pass.length>0){
      data.set("password",pass);
    }
    data.set("name",this.name);
    data.set("email",this.email);
        this.user_.updateUser(this.userId,data).subscribe(
          (res) => {
            {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your data has been updated.',
                showConfirmButton: false,
                timer: 3000,
              }).then(() => {
                setTimeout(() => {
                  this.fetchData();
                  this.modalService.dismissAll();
                  // window.location.reload();
                }, 0);
              });
            }
          },
          (err) => {
            if (err)
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text:err.error.message,
              }),
                console.error(err);
          }
        );
  }
}
