import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from "./hero";


@Injectable()
export class HeroService {
  private heroesUrl = 'app/heroes';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  /*
   const HEROES: Hero[] = [
     { id: 11, name: 'Mr. Nice' },
     { id: 12, name: 'Narco' },
     { id: 13, name: 'Bombasto' },
     { id: 14, name: 'Celeritas' },
     { id: 15, name: 'Magneta' },
     { id: 16, name: 'RubberMan' },
     { id: 17, name: 'Dynama' },
     { id: 18, name: 'Dr IQ' },
     { id: 19, name: 'Magma' },
     { id: 20, name: 'Tornado' }
   ];
   */

  create(name: String): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      // why doesn't this have "as Hero" ?
      .then(res => res.json().data)
      .catch(this.handleError)
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError)
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError)
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response =>
        response.json().data as Hero[])
      .catch(this.handleError);
  }

  /*
   hero: Hero = {
     id: 1,
     name: 'Windstorm'
   };
   */

  getHero(id: number): Promise<Hero> {
    //return Promise.resolve(HEROES.find(hero => hero.id === id));
    return this.getHeroes()
      .then(heroes =>
        heroes.find(hero =>
          hero.id === id))
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve =>
      // delay 2 seconds
      setTimeout(resolve, 2000))
      .then(() => this.getHeroes());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only

    return Promise.reject(error.message || error);
  }
}