import { Component } from '@angular/core';
import { SavesService } from '../../services/saves.service';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-saves',
  templateUrl: './saves.component.html',
  styleUrl: './saves.component.css'
})
export class SavesComponent {
    //global variables ---------------------------------------------------------------------------------
    allPosts!: any;
    userId!:any;
  constructor(private post: SavesService, private cookieService: CookieService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData(){
    this.userId = this.cookieService.get('userId');
    this.post.getUserSaves(this.userId).subscribe((res: any) => {
      (this.allPosts = res);
    });
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
          this.post.deleteSaved(id).subscribe(
            (res) => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your post has been deleted.',
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
