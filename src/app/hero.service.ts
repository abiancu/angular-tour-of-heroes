import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
 
@Injectable()
export class HeroService {

  constructor() { }

  // getHeroes(): Hero[]{  // < -- RETURN MOCK-HEROES 
  // return HEROES; 
  // }

  getHeroes(): Observable<Hero[]>{
    return of(HEROES);
  }

}
