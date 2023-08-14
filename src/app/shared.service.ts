// import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIurl="http://localhost:53535";
  constructor(private http:HttpClient) {  }

  getStudentList():Observable<any[]>{
    return this.http.get<any>(this.APIurl+'/api/Student_Data');
  }
  addToStudentList(val: any){
    return this.http.post<any>(this.APIurl+'/api/Student_Data',val);
  }
  UpdateStudentList(val: any){
    return this.http.put<any>(this.APIurl+'/api/Student_Data',val);
  }
  DeleteStudentList(val: number){
    return this.http.delete<any>(this.APIurl+'/api/Student_Data/'+val);
  }


    // private myVariable = new BehaviorSubject<boolean>(true);
  
    // getVariable() {
    //   return this.myVariable.asObservable();
    // }
  
    // setVariable(value: boolean) {
    //   this.myVariable.next(value);
    // }

}
  






