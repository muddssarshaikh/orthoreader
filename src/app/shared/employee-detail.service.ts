import { Injectable } from '@angular/core';
import { EmployeeDetail } from './employee-detail.model';;
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'http://localhost:57065/api/EmployeeDetail'
  formData: EmployeeDetail = new EmployeeDetail();
  //list of array to fill in employee
  list: EmployeeDetail[];

  postEmployeeDetail() {
    return this.http.post(this.baseURL, this.formData);
  }

  putEmployeeDetail() {
    return this.http.put(`${this.baseURL}/${this.formData.empID}`, this.formData);
  }
  deleteEmployeeDetail(id:number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }
  refreshlist() {
    //returns an observable and converte it into promise then success function inside that we have callback funtion
    //to deal with success response and converting response into employeedetail array
    this.http.get(this.baseURL)
      .toPromise()
      .then(response => {
        this.list = response as EmployeeDetail[]
      }
      );

  }
}
