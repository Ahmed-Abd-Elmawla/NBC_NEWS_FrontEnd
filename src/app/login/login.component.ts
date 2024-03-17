import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  login!: FormGroup;
  password: any;
  email: any;
  resetForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private cookieService: CookieService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.login = this.fb.group({
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
    });

    this.resetForm = this.fb.group({
      pass: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*@%$#])[A-Za-z\d*@%$#]{8,}$/
        ),
      ]),
      confirmPass: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  loginFn() {
    const formdata = new FormData();
    formdata.append('email', this.login.get('email')?.value);
    formdata.append('password', this.login.get('password')?.value);
    this.user.login(formdata).subscribe((res: any) => {
      console.log(res);
      if (res.message == false) {
        Swal.fire('No account found', 'please register again', 'error');
      } else {
        // localStorage.setItem('user', JSON.stringify(res));
        this.cookieService.set('userId', res.id);
        Swal.fire({
          icon: 'success',
          title: 'Logged in successfully',
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          setTimeout(() => {
            window.location.href = '';
          }, 0);
        });
      }
    });
  }


  reset(content: any) {
    this.modalService.open(content, { centered: true });
  }

  //-----------------------------------------------------------------------------------------
  sendCode(email: any, content: any) {
    Swal.fire({
      title: 'searching',
      html: 'please wait ...',
      timer: 10000,
      didOpen: () => {
        Swal.showLoading();
        this.user.findUser(email).subscribe(
          (res: any) => {
            if (res.message == false) {
              Swal.fire(
                'This email not found',
                'please register again',
                'error'
              );
            } else {
              sessionStorage.setItem('email', email);
              Swal.close();
              this.modalService.dismissAll();
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Verification code sent successfully.',
                showConfirmButton: false,
                timer: 3000,
              }).then(() => {
                setTimeout(() => {
                  this.modalService.open(content, { centered: true });
                }, 0);
              });
            }
          },
          (err) => {
            if (err)
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.error.message,
              }),
                console.error(err);
          }
        );
      },
    });
  }

  checkCode(code: any, content: any) {
    const email = sessionStorage.getItem('email');
    this.user.checkCode(email, code).subscribe(
      (res: any) => {
        console.log(res);
        if (res.message == false) {
          Swal.fire('invalid code', '', 'error');
        } else {
          this.modalService.dismissAll();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'code verified',
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            setTimeout(() => {
              this.modalService.open(content, { centered: true });
            }, 0);
          });
        }
      },
      (err) => {
        if (err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          }),
            console.error(err);
      }
    );
  }

  resetPassword(pass: any) {
    const email = sessionStorage.getItem('email');
    const data = {
      password: pass,
    };
    this.user.reset(email, data).subscribe(
      (res) => {
        sessionStorage.removeItem('email');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'password reset successfully.',
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 0);
        });
      },
      (err) => {
        if (err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          }),
            console.error(err);
      }
    );
  }
}
