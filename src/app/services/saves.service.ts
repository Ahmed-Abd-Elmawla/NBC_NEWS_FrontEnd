import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SavesService {
  constructor(private http: HttpClient) {}

  //Get user saves -------------------------------------------------------
  getUserSaves(id: number) {
    return this.http.get(`http://localhost:8000/api/user-saves/${id}`);
  }

  //user save post -----------------------------------------------------------------
  userAddSaved(data: any) {
    return this.http.post('http://localhost:8000/api/saves', data);
  }

  //User delete saved post---------------------------------------------------------
  deleteSaved(id: any) {
    return this.http.delete(`http://localhost:8000/api/saves/${id}`);
  }
}
