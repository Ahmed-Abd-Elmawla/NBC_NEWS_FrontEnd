import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {}

  //Get All received messages-----------------------------------------------------------
  getAllMessages() {
    return this.http.get('http://localhost:8000/api/contacts');
  }

  //user send messages -----------------------------------------------------------------
  userSendMessage(data: any) {
    return this.http.post('http://localhost:8000/api/contacts', data);
  }

  //Admin send reply mail for received message------------------------------------------
  sendMail(data: any) {
    return this.http.post('http://localhost:8000/api/mail', data);
  }

  //Admin update a received message status---------------------------------------------
  updateMessage(id: any,data:any) {
    return this.http.put(`http://localhost:8000/api/contacts/${id}`,data);
  }

  //Admin delete a received messages---------------------------------------------------
  deleteMessage(id: any) {
    return this.http.delete(`http://localhost:8000/api/contacts/${id}`);
  }
}
