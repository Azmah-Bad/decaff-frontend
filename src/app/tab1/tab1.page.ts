import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  caffeineIntakeToday = 0;
  private cup2caffeine = { "espresso": 64, "coke": 22 } // in mg

  constructor() {}

  LogCuteCoffee(cup: string): void {
    this.caffeineIntakeToday += this.cup2caffeine[cup]
    // this.coffeeService.intake(this.cup2caffeine[cup])
    // Dancing coffee easter egg
    if (this.caffeineIntakeToday > 200) {
      // this.audioService.play();
      // this.nativeAudio.play('TEST')
      
    }
  }

}
