import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  current = 0;
  constructor() { }

  ngOnInit(): void {
  }

  decrement(): void {
    this.current -= 1;
  }

  increment(): void {
    this.current += 1;
  }

}
