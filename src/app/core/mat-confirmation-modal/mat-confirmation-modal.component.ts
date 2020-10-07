import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-mat-confirmation-modal',
  templateUrl: './mat-confirmation-modal.component.html',
  styleUrls: ['./mat-confirmation-modal.component.css']
})
export class MatConfirmationModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public message: string, public dialogRef: MatDialogRef<MatConfirmationModalComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
