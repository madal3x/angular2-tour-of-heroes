import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { HeroService } from './hero.service';
import { Hero } from "./hero";


@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'hero-detail.component.html',
  styleUrls: ['hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  constructor(private heroService: HeroService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  @Input()
  hero: Hero;

  ngOnInit(): void {
    this.route.params
      // If the user re-navigates to this component while a getHero request is still inflight, switchMap cancels that old request before calling HeroService.getHero again.
      .switchMap((params: Params) =>
        // The hero id is a number. Route parameters are always strings. So we convert the route parameter value to a number with the JavaScript (+) operator.
        this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero)
  }

  goBack(): void {
    this.location.back();
  }

  // why is there save here and update in heroservice;
  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack())
  }
}