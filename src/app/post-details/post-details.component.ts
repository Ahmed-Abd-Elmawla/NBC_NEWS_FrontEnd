import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsServiceService } from '../services/posts-service.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent {
  post!:any;
constructor(private activatedRoute:ActivatedRoute,private req:PostsServiceService){}
ngOnInit(): void {
  this.req
  .getPost(this.activatedRoute.snapshot.params['id'])
  .subscribe((res: any) => {
    console.log(res);
    this.post = res;
  });
}
/////////////////////////////////////////////////////////////////////
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

progressBarWidth = '0%';

@HostListener('window:scroll', [])
onWindowScroll() {
  const navbarElement = document.querySelector('.navbar') as HTMLElement;
  if (!navbarElement) return; // Check if navbarElement is null

  const navbarHeight = navbarElement.offsetHeight;
  const scrollPosition = window.pageYOffset;
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollPosition / totalHeight) * 100;

  this.progressBarWidth = progress + '%';
}
}
