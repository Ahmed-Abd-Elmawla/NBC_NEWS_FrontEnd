import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsServiceService } from '../services/posts-service.service';

@Component({
  selector: 'app-category-posts',
  templateUrl: './category-posts.component.html',
  styleUrl: './category-posts.component.css'
})
export class CategoryPostsComponent {
posts!:any;
constructor(private activatedRoute:ActivatedRoute,private req:PostsServiceService){}

ngOnInit(): void {
  this.req
  .getPostsByCategoryId(this.activatedRoute.snapshot.params['id'])
  .subscribe((res: any) => {
    console.log(res);
    this.posts = res;
  });
}


//calculate the hours of post
calculateTimeSincePosted(updated_at: string) {
  const currentTime = new Date();
  const postDate = new Date(updated_at);
  const timeDifference = currentTime.getTime() - postDate.getTime();
  const hoursSincePosted = Math.floor(timeDifference / (1000 * 60 * 60));

  if (hoursSincePosted < 24) {
    return `${hoursSincePosted} hours ago`;
  } else {
      const daysSincePosted = Math.floor(hoursSincePosted / 24);
      return `${daysSincePosted} days ago`;
  }
}

}
