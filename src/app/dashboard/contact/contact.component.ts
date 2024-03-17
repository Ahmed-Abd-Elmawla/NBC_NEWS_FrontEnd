import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  //global variables ---------------------------------------------------------------------------------
   allMessages!:any;
   messageContent!:any;
   name!:any;
   email!:any;
   subject!:string;
   title!:any;
   replyMessage!:any;
   id!:any;
   form!: FormGroup;

   constructor(private req:ContactService, private modalService: NgbModal,
     private fb: FormBuilder,){}

   ngOnInit(){
this.fetchData();

     //create validation for form--------------------------------------------------------------------
     this.form = this.fb.group({
       title: new FormControl(null, [
         Validators.required,
         Validators.minLength(20),
         Validators.maxLength(100),
       ]),
       subject: new FormControl(null, [
         Validators.required,
         Validators.minLength(20),
         Validators.maxLength(100),
       ]),
       replyMessage: new FormControl(null, [
         Validators.required,
         Validators.minLength(50),
         Validators.maxLength(1000),
       ]),
 });
     //make all input fields touched to show errors after the form load
     Object.values(this.form.controls).forEach((control) => {
       control.markAsTouched();
     });
   }
fetchData() {
  this.req.getAllMessages().subscribe((res: any) => {
    (this.allMessages = res);
  });
}
   view(model:any,name:any,message:any){
     this.messageContent=message;
     this.name = name;
     this.modalService.open(model, { centered: true });
   }

   openReply(model:any,email:any,id:any){
     this.id=id;
     this.email=email;
     this.modalService.open(model, { centered: true });
   }

 //Admin send replay email---------------------------------------------------------------------------
   sendMail(){
     const formData = new FormData();
     formData.append('email',this.email);
     formData.set('title', this.title);
     formData.set('subject', this.subject);
     formData.set('message', this.replyMessage);
     const data={
       "status":"Replied"
     }

     Swal.fire({
       title: 'Sending email',
       html: 'please wait ...',
       timer: 10000,
       didOpen: () => {
         Swal.showLoading();
         this.req.sendMail(formData).subscribe(
           (res) => {
             Swal.close();
             this.req.updateMessage(this.id, data).subscribe();
             Swal.fire({
               position: 'center',
               icon: 'success',
               title: 'Mail sent successfully.',
               showConfirmButton: false,
               timer: 3000,
             }).then(() => {
               setTimeout(() => {
                //  window.location.reload();
                this.fetchData();
                this.modalService.dismissAll();
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
       },
     })
   }


  //delete post---------------------------------------------------------------------------------------
  delete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#0d6efd',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.req.deleteMessage(id).subscribe(
          (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Message has been deleted.',
              showConfirmButton: false,
              timer: 3000,
            }).then(() => {
              setTimeout(() => {
                // window.location.reload();
                this.fetchData();
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
    });
  }
 }
