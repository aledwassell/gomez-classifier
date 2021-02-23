import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Gomez Classifier';
  private dialogREference: any;

  constructor(private readonly dialog: MatDialog){}

  ngOnInit() {
    // const dialogRef = this.dialog.open(IntroductionDialog);
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
}

@Component({
  selector: 'introduction-dialog',
  templateUrl: './introduction-dialog.html',
})
export class IntroductionDialog {}
