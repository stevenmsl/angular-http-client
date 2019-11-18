import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // url: api/heroes
    const heroes = [
      { id: 11, name: "Dr Nice" },
      { id: 12, name: "Narco" },
      { id: 13, name: "Bombasto" },
      { id: 14, name: "Celeritas" }
    ];

    // url: api/countries
    const countries = [
      { id: 1, name: "Canada" },
      { id: 2, name: "US" }
    ];

    return { heroes, countries };
  }
}
