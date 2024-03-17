import { Component } from '@angular/core';
import { PostsServiceService } from '../services/posts-service.service';
import Swal from 'sweetalert2';
import { SavesService } from '../services/saves.service';
import { CookieService } from 'ngx-cookie-service';
import { LikesService } from '../services/likes.service';

@Component({
  selector: 'app-editor-picks',
  templateUrl: './editor-picks.component.html',
  styleUrl: './editor-picks.component.css',
})
export class EditorPicksComponent {
  constructor(private postService: PostsServiceService,private save:SavesService, private cookieService: CookieService,private like:LikesService) {}
  posts:any=[];
  flag = true;
  userId:any;
  likes: any;
  ngOnInit(): void {
this.fetchData();
  }
//////////////////////////////////////////////////////////////////////
fetchData(){
  this.userId = this.cookieService.get('userId');
  this.postService.getPostsByStatus('published').subscribe((res: any) => {
    if (res.length > 0) {
      this.posts = res;
    } else {
      this.flag = false;
    }
  });
  this.like.getUserLikes(this.userId).subscribe((res: any) => {
    this.likes = res,console.log(this.likes);;
  });
}

/////////////////////////////////////////////////////////////////////////
  addSaved(post_id: any) {
    if (!this.userId) {
      {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Login First !!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setTimeout(() => {
            window.location.href = 'login';
          }, 1000);
        });
      }
    } else {
      const data = {
        user_id: this.userId,
        post_id: post_id
      };
      this.save.userAddSaved(data).subscribe(
          (res:any) => {
            console.log(res);
            if(res && res.message==='false'){
              Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Already Saved.',
                showConfirmButton: false,
                timer: 2000,
              })
            }else{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'post has been saved.',
              showConfirmButton: false,
              timer: 3000,
            }).then(() => {
              setTimeout(() => {
                // window.location.reload();
              }, 0);
            });
          } },
          (err) => console.error(err)
        );
    }
}


//////////////////////////////////////////////////////////////////////////
checkLike(post_id: number): boolean {
  const arrayOfPostIds = this.likes?.map((obj: { post_id: any; }) => obj.post_id);
  return arrayOfPostIds?.includes(post_id);
}
///////////////////////////////////////////////////////////////////////////
addLike(post_id: any) {
  if (!this.userId) {
    {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Login First !!',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        setTimeout(() => {
          window.location.href = 'login';
        }, 1000);
      });
    }
  } else {
    const data = {
      user_id: this.userId,
      post_id: post_id,
    };
    this.like.userAddLike(data).subscribe(
      (res: any) => {
        // this.toggleHeart();
        this.fetchData();
      },
      (err) => console.error(err)
    );
  }
}
}
