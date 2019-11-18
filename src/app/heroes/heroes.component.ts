import { Component, OnInit } from "@angular/core";
import { Hero } from "./hero";
import { HeroesService } from "./heroes.service";
import { Country } from "./country";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  providers: [HeroesService],
  styleUrls: ["./heroes.component.css"]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  countries: Country[];
  editHero: Hero; //the hero currently being edited
  constructor(private heroesService: HeroesService) {}

  ngOnInit() {
    this.getHeroes();
    this.getCountries();
  }

  getHeroes(): void {
    this.heroesService.getHeroes().subscribe(heroes => (this.heroes = heroes));
  }
  getCountries(): void {
    this.heroesService
      .getCountries()
      .subscribe(countries => (this.countries = countries));
  }
}
