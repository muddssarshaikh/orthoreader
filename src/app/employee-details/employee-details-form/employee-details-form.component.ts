import { Component, ErrorHandler, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeDetail } from 'src/app/shared/employee-detail.model';
import { EmployeeDetailService } from 'src/app/shared/employee-detail.service';

@Component({
  selector: 'app-employee-details-form',
  templateUrl: './employee-details-form.component.html',
  styles: [
  ]
})
export class EmployeeDetailsFormComponent implements OnInit {

  constructor(public service: EmployeeDetailService,
    private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.empID == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postEmployeeDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshlist();
        this.toaster.success('Submited Successfully', 'Employee Register');
      },
      err => {
        console.log(err);
      }
    )
  }
  updateRecord(form: NgForm) {
    this.service.putEmployeeDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshlist();
        this.toaster.info('Updated Successfully', 'Employee Register');
      },
      err => {
        console.log(err);
      }
    )
  }
  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new EmployeeDetail();

  }

}
