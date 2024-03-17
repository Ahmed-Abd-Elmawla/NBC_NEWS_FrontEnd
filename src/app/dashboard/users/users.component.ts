import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  allUsers!:any;

  constructor(private user:UserService) { }

  ngOnInit() {
    this.fetchData();
  }

fetchData(){
  this.user.getAllUsers().subscribe((res: any) => {
    (this.allUsers = res);
  });
}
 //update user role---------------------------------------------------------------------------------------
update(id:number,data:any){
  console.log(data);
  const formData = new FormData();
  formData.set('role_id',data);
  this.user.updateUser(id,formData).subscribe(
    (res) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Role has been updated.',
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        setTimeout(() => {
          this.fetchData();
          // window.location.reload();
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
   //delete user---------------------------------------------------------------------------------------
  delete(id:number){
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
        this.user.deleteUser(id).subscribe(
          (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'user has been deleted.',
              showConfirmButton: false,
              timer: 3000,
            }).then(() => {
              setTimeout(() => {
                this.fetchData();
                // window.location.reload();
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
