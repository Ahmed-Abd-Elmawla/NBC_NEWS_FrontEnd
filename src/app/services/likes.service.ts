import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor(private http: HttpClient) {}

  //Get user likes-----------------------------------------------------------------
  getUserLikes(id: number) {
    return this.http.get(`http://localhost:8000/api/user-likes/${id}`);
  }

  //user like post -----------------------------------------------------------------
  userAddLike(data: any) {
    return this.http.post('http://localhost:8000/api/likes', data);
  }

  //User delete like----------------------------------------------------------------
  deleteLike(id: any) {
    return this.http.delete(`http://localhost:8000/api/likes/${id}`);
  }
}
