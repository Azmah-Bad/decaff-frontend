import { Component, OnInit, Input } from '@angular/core';
import { statments } from "../../../assets/infos.json";


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  private json = ""

  statement_title = "Information";
  statement_text = "";

  @Input() statement: string;

  constructor() { }

  ngOnInit() { 
    this.laodStatement(this.statement);
  }
  

  /**
   * select a random cooresponding statement from the json file
   */
  laodStatement(statment: string){
    this.statement_text = statments[statment][Math.floor(Math.random() * statments[statment].length)];
  }


}