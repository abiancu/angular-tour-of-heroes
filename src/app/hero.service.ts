import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



import { Hero } from './hero';
// import { HEROES } from './mock-heroes'; No longer need becuase in-memory-data.service.ts has the heroes properties
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
 import { catchError, map, tap } from 'rxjs/operators';


 const httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
 };

@Injectable()
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    private log(message: string){
      this.messageService.add('HeroService: ' + message);
    }

    private heroesUrl = 'api/heroes';

    private handleError<T>(operation = 'operation', result?: T){
      return (error: any): Observable<T> =>{
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      }
    }


  //

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
  }

  // getHero(id: number ): Observable<Hero>{
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }

  getHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)), catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero  (hero:Hero ): Observable<any>{
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(tap(_ => this.log(`update hero id={hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
    );
  }

  //this is a POST request to add a new hero to the server//
  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)), catchError(this.handleError<Hero>('addHero'))
    );
  }

  // to DELETE hero from server
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  
  //GET hero by search term
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

}
