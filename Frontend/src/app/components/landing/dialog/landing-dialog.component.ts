import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'landing-dialog',
    templateUrl: './landing-dialog.component.html',
    styleUrls: ['./landing-dialog.component.css']
  })
  
export class BooksListDialog {
    constructor(public dialogRef: MatDialogRef<BooksListDialog>, 
                @Inject (MAT_DIALOG_DATA) public data: {title: string}) {}
  
    onNoClick(): void {
      this.dialogRef.close(false);
    }
  
    onYesClick(): void {
      this.dialogRef.close(true);
    }
}