import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Hero }                from './hero';
import { HeroService }         from './hero.service';

/*Set the moduleId property to module.id so that templateUrl and styleUrls are relative to the component.*/
@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css'],
  providers: [HeroService]
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private router: Router,
              private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  // why is there add here and create in heroservice;
  add(name: String): void {
    // awkward to have these trims and check for empty everywhere
    name = name.trim();
    if (!name)
      return;

    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      })
  }

  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      });
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes)
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}