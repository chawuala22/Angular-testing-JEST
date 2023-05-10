import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-counter-route',
  templateUrl: './counter-route.component.html',
  styleUrls: ['./counter-route.component.scss']
})
export class CounterRouteComponent {
  counter: number = 0;

  constructor( private route:ActivatedRoute ) { }

  ngOnInit(): void {
   const initial = Number(this.route.snapshot.paramMap.get('id')); 
   this.counter = isNaN(initial) ? 10 : initial;
    
  }

  increaseBy( value: number ) {
    this.counter += value; 
  }
}
