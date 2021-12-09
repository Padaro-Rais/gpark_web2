import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  constructor(private dialog : MatDialog) { }
  confirmDialog(msg: any){
     return this.dialog.open(ConfirmDialogComponent,{
      width:'390px',
      disableClose: true,
      data :{
        message: msg
      }
    })
  }
}
