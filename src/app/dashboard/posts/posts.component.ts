import { Component } from '@angular/core';
import { PostsServiceService } from '../../services/posts-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
    //global variables ---------------------------------------------------------------------------------
    allPosts!: any;
  constructor(private post: PostsServiceService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData(){
    this.post.getAllPosts().subscribe((res: any) => {
      (this.allPosts = res);
    });
  }

  //update post status---------------------------------------------------------------------------------------
update(id:number,oldStatus:any,data:any){
if(oldStatus!=data){
  const formData = new FormData();
  formData.set('_method','PUT');
  formData.set('status',data);
  this.post.updatePostStatus(id,formData).subscribe(
    (res) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'post status has been updated.',
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
          this.post.deletePost(id).subscribe(
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
