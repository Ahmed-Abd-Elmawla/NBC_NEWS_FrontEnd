import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {




  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private contact:ContactService) {
    this.createForm();
  }

  createForm() {
    this.contactForm = this.fb.group({
      first_name: ['',[ Validators.required,Validators.minLength(3)]],
      last_name: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() { return this.contactForm.controls; }

  get first_name() { return this.contactForm.get('first_name'); }
  get last_name() { return this.contactForm.get('last_name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }


onSubmit() {
    this.contact.userSendMessage( this.contactForm.value).subscribe(
      (res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Message sent successfully!',
          showConfirmButton: false,
          timer: 3000,
        })
        this.contactForm.reset();
      },
      (err) => {
        if (err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          })
      }
    );
  }
}





