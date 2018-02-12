import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero'
// import { HEROES } from '../mock-heroes'; //<-- don't need it becuase I imported HeroServices below.
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // heroes = HEROES; //<-- this won't work, replce with the line below:
  heroes: Hero[];

  // selectedHero: Hero;
  
  // hero: Hero ={
  //     id: 1,
  //     name: 'Alejandro'
  //   };

  constructor(private heroService: HeroService) { } //<-- To inject the HeroService

  ngOnInit() {
    this.getHeroes(); 
    
  }

  // onSelect(hero:Hero): void{
  //   this.selectedHero = hero;  
  // }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
}
