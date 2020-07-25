import { Component, OnInit, Input } from '@angular/core';



@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  @Input() statementTitle: string;
  @Input() statementBody: string;
  constructor() { }

  ngOnInit() { 
  }
  


  /**
   * select a random cooresponding statement from the json file
   */
  // laodStatement(statment: string){
  //   this.statmentBody = statments[statment][Math.floor(Math.random() * statments[statment].length)];
  // }



}