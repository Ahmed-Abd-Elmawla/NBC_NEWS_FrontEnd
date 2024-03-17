import { Component } from '@angular/core';
import { PostsServiceService } from '../services/posts-service.service';
import { SavesService } from '../services/saves.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { LikesService } from '../services/likes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

constructor(private postService : PostsServiceService,private save:SavesService, private cookieService: CookieService,private like:LikesService){}
posts:any;
flag=true;
userId!:any;
likes: any;
ngOnInit(): void {
this.fetchData();
}

fetchData(){
  this.userId = this.cookieService.get('userId');
  this.postService.getPostsByStatus('trending').subscribe((res: any) => {
    if (res.length > 0) {
      this.posts = res[0];
    }else{
      this.flag = false;
    }
      });
      this.like.getUserLikes(this.userId).subscribe((res: any) => {
        this.likes = res,console.log(this.likes);;
      });
}
  //calculate the hours of post
  calculateTimeSincePosted(updated_at: string) {
    const currentTime = new Date();
    const postDate = new Date(updated_at);
    const timeDifference = currentTime.getTime() - postDate.getTime();
    const minutesSincePosted = Math.floor(timeDifference / (1000 * 60));
    const hoursSincePosted = Math.floor(timeDifference / (1000 * 60 * 60));

    if (hoursSincePosted < 24) {
      if (hoursSincePosted === 0) {
        return `${minutesSincePosted} min ago`;
    } else {
        return `${hoursSincePosted} hours ago`;
    }
    } else {
        const daysSincePosted = Math.floor(hoursSincePosted / 24);
        return `${daysSincePosted} days ago`;
    }
  }

/////////////////////////////////////////////////////////////////////////////////////
  addSaved(post_id: any) {
    if (!this.userId) {
      {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Login First !!',
          showConfirmButton: false,
          timer: 2000,
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
              timer: 2000,
            }).then(() => {
              setTimeout(() => {
                // window.location.reload();
                this.fetchData();
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
  console.log(arrayOfPostIds);
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
