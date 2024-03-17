import { Component } from '@angular/core';
import { PostsServiceService } from '../services/posts-service.service';

@Component({
  selector: 'app-breaking',
  templateUrl: './breaking.component.html',
  styleUrl: './breaking.component.css'
})
export class BreakingComponent {
  constructor(private postService : PostsServiceService){}
  posts!:any;
  flag=true;
  ngOnInit(): void {
    this.postService.getPostsByStatus('breakingNews').subscribe((res: any) => {
      if (res.length > 0) {
        this.posts = res;
        console.log(this.posts);
      }else{
        this.flag = false;
      }
        });
  }
}
