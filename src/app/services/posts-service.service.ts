import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsServiceService {

  constructor(private http:HttpClient) { }
    //Get All Posts
    getAllPosts() {
      return this.http.get('http://localhost:8000/api/posts');
    }

    //Get posts by user_id
    getPostsByUserId(id: any) {
      return this.http.get(`http://localhost:8000/api/posts/user/${id}`);
    }

    //Get posts by category_id
    getPostsByCategoryId(id: any) {
      return this.http.get(`http://localhost:8000/api/posts/category/${id}`);
    }

        //Get posts by category_id
        getPostsByStatus(status: any) {
          return this.http.get(`http://localhost:8000/api/posts/status/${status}`);
        }

    //Create New Post
    createPost(data: any) {
      return this.http.post('http://localhost:8000/api/posts', data);
    }

    //Get A Post By It's Id
    getPost(id: any) {
      return this.http.get(`http://localhost:8000/api/posts/${id}`);
    }

    //Update A Post By It's Id
    updatePost(post: any,article_1: any,article_2: any, data: any) {
      return this.http.post(`http://localhost:8000/api/posts/${post}/${article_1}/${article_2}`, data);
    }

        //Update A Post By It's Id
        updatePostStatus(post: any, data: any) {
          return this.http.post(`http://localhost:8000/api/posts/${post}`, data);
        }
    //Delete A Post
    deletePost(id: any) {
      return this.http.delete(`http://localhost:8000/api/posts/${id}`);
    }

    //search posts
    search(col:any,pattern:any){
      return this.http.get(`http://localhost:8000/api/posts/search/${col}/${pattern}`);
    }
}
