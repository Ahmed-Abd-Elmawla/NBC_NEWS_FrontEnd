import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  register(data:any){
    return this.http.post('http://localhost:8000/api/register',data);
  }

  login(data:any){
    return this.http.post('http://localhost:8000/api/login',data);
  }
  getAllUsers() {
    return this.http.get('http://localhost:8000/api/users');
  }

  getUserById(id: any) {
    return this.http.get(`http://localhost:8000/api/users/${id}`);
  }

  deleteUser(id: number){
    return this.http.delete(`http://localhost:8000/api/users/${id}`);
}

updateUser(id: number,data:any){
  return this.http.post(`http://localhost:8000/api/users/update/${id}`,data);
}

getUsersByStatus(stat:any){
  return this.http.get(`http://localhost:8000/api/users/status/${stat}`);
}

findUser(email:any){
  return this.http.get(`http://localhost:8000/api/users/find/${email}`);
}

checkCode(email:any,code:number){
  return this.http.get(`http://localhost:8000/api/users/check/${email}/${code}`);
}

reset(email:any,pass:any){
  return this.http.post(`http://localhost:8000/api/users/reset/${email}`,pass);
}
}
