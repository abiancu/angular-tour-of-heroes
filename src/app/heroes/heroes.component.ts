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

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  //the DELETE hero method//
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  

}
