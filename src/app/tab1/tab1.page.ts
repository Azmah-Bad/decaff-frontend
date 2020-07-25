import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { generate } from 'rxjs';
import { CoffeeService } from "../coffee.service";
import { statments } from "../../assets/infos.json";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  caffeineIntakeToday = 0;
  private cup2caffeine = { "espresso": 64, "coke": 22 } // in mg
  public PFR_BAR = this.cup2caffeine["espresso"] * 7 // private joke
  private USERID_KEY = "userID";
  private MAX_USERID = 10000;
  private MAX_CAFFEINE_PER_DAY = 300;
  public userID: number;
  private DANCING_COFFIN = "../../assets/sound/too_much_coffee.mp3"// private joke
  public status = ["information","hello world ☕️"];
  public progressBarValue = 0;
  public statementTitle: string;
  public statementBody: string;


  constructor(
    private cookiewithyoucoffee: CookieService,// come on the name is dope
    private coffeeService: CoffeeService // need sugar/milk service and will be perfect 
  ) { }
  
  ngOnInit() {
    // load data from db if availible 
    if (this.cookiewithyoucoffee.check(this.USERID_KEY)) {
      this.loadUserID();
      // get caffeine intake in last 24h 
      this.coffeeService.getCoffeeIntake(this.userID).subscribe((resp) => {
        this.caffeineIntakeToday = resp.caffeineInLast24h;
        this.updateProgressBar();
      })

    } else {
      this.generateUserID();
    }

    this.updateStatment("Information");

  }

  LogCuteCoffee(cup: string): void {
    this.caffeineIntakeToday += this.cup2caffeine[cup];
    //push this data into a db
    this.coffeeService.newIntake(this.cup2caffeine[cup], this.userID);    
    this.updateProgressBar();
    if (this.caffeineIntakeToday > this.MAX_CAFFEINE_PER_DAY) {
      // this.status = ["warning", this.laodStatement("warning")];
      // console.log(this.status);
      this.updateStatment("Warning");
      if (this.caffeineIntakeToday > this.PFR_BAR) {
        this.pfr_acheivement();
      }

    } else {
      this.updateStatment("Information");
    }
    
  }

  loadUserID() {
    this.userID = +this.cookiewithyoucoffee.get(this.USERID_KEY);
  }

  generateUserID() {
    this.userID = Math.floor(Math.random() * Math.floor(this.MAX_USERID)); // creates a random userID 
    this.cookiewithyoucoffee.set(this.USERID_KEY, this.userID.toString());
  }

  updateProgressBar() {
    this.progressBarValue = this.caffeineIntakeToday / this.MAX_CAFFEINE_PER_DAY
  }

  pfr_acheivement() {
    var audio = new Audio(this.DANCING_COFFIN);
    audio.play();
    console.log("👨🏿‍✈️👨🏿‍✈️⚰️👨🏿‍✈️👨🏿‍✈️")
  }

  updateStatment(status:string) {
    this.statementTitle = status;
    this.laodStatement()
  }
  

    /**
   * select a random cooresponding statement from the json file
   */
  laodStatement(){
    this.statementBody = statments[this.statementTitle][Math.floor(Math.random() * statments[this.statementTitle].length)];
  }


}
