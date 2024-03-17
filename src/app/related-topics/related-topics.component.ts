import { Component } from '@angular/core';
import { PostsServiceService } from '../services/posts-service.service';

@Component({
  selector: 'app-related-topics',
  templateUrl: './related-topics.component.html',
  styleUrl: './related-topics.component.css'
})
export class RelatedTopicsComponent {

  constructor(private postService: PostsServiceService) {}
  posts!: any;
  flag = true;
  ngOnInit(): void {
    this.postService.getPostsByStatus('published').subscribe((res: any) => {
      if (res.length > 0) {
        this.posts = res.slice(0,5);
      } else {
        this.flag = false;
      }
    });
  }
}
