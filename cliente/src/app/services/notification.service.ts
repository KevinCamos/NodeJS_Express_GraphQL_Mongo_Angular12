import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}


  showSuccess(message:any, title:any) {
    this.toastr.success(message, title);
  }
  showWarning(message:any, title:any) {
    this.toastr.warning(message, title);
  }

  showError(message:any, title:any) {
    this.toastr.error(message, title);
  }
  showInfo(message:any, title:any) {
    this.toastr.info(message, title);
  }

  showHTMLMessage(message:any, title:any) {
    this.toastr.success(message, title, {
      enableHtml :  true
    })
  }

  showSuccessWithTimeout(message:any, title:any, timespan:number){
    this.toastr.success(message, title ,{
      timeOut :  timespan
    })
  }
}
