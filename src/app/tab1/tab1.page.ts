import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { generate } from 'rxjs';
import { CoffeeService } from "../coffee.service";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  caffeineIntakeToday = 0;
  private cup2caffeine = { "espresso": 64, "coke": 22 } // in mg
  private USERID_KEY = "userID";
  private MAX_USERID = 10000;
  public userID: number;


  constructor(
    private cookiewithyoucoffee: CookieService,
    private coffeeService: CoffeeService
  ) { }
  
  ngOnInit() {
    // load data from db if availible 
    if (this.cookiewithyoucoffee.check(this.USERID_KEY)) {
      this.loadUserID();
      // get caffeine intake in last 24h 
      this.coffeeService.getCoffeeIntake(this.userID).subscribe((resp) => {
        this.caffeineIntakeToday = resp.caffeineInLast24h;
      })

    } else {
      this.generateUserID();
    }
  }

  LogCuteCoffee(cup: string): void {
    this.caffeineIntakeToday += this.cup2caffeine[cup];
    //TODO :: push this data into a db
    let time = new Date();
    
    // Dancing coffee easter egg
    if (this.caffeineIntakeToday > 200) {
      // this.audioService.play();
      
    }
  }

  loadUserID() {
    this.userID = +this.cookiewithyoucoffee.get(this.USERID_KEY);
  }

  generateUserID() {
    this.userID = Math.floor(Math.random() * Math.floor(this.MAX_USERID)); // creates a random userID 
    this.cookiewithyoucoffee.set(this.USERID_KEY, this.userID.toString());
  }
}
