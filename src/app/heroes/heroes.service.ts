import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

import { Hero } from "./hero";
import { HttpErrorHandler, HandleError } from "../http-error-handler.service";
import { Country } from "./country";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token"
  })
};

@Injectable()
export class HeroesService {
  heroesUrl = "api/heroes";
  countriesUrl = "api/countries";
  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError("HeroesService");
  }

  getHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(catchError(this.handleError("getHeroes", [])));
  }

  getCountries(): Observable<Country[]> {
    return this.http
      .get<Country[]>(this.countriesUrl)
      .pipe(catchError(this.handleError("getCountries", [])));
  }

  searchHeroes(term: string): Observable<Hero[]> {
    term = term.trim();

    // Add safe, URL encoded search parameter if there is a search term
    const options = term ? { params: new HttpParams().set("name", term) } : {};

    return this.http
      .get<Hero[]>(this.heroesUrl, options)
      .pipe(catchError(this.handleError<Hero[]>("searchHeroes", [])));
  }

  /** POST: add a new hero to the database */
  addHero(hero: Hero): Observable<Hero> {
    return this.http
      .post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(catchError(this.handleError("addHero", hero)));
  }
  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<{}> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http
      .delete(url, httpOptions)
      .pipe(catchError(this.handleError("deleteHero")));
  }
  updateHero(hero: Hero): Observable<Hero> {
    httpOptions.headers = httpOptions.headers.set(
      "Authorization",
      "my-new-auth-token"
    );
    return this.http
      .put<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(catchError(this.handleError("updateHero", hero)));
  }
}
