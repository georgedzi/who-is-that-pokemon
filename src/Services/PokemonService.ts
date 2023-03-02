import { Pokemon } from "../Models/Pokemon";
import { ajax } from "rxjs/ajax";
import { IPokeApiResponse } from "../Models/IPokeApiResponse";
import { catchError, firstValueFrom, map, Observable, throwError } from "rxjs";
import { IPokeApiDetailsResponse } from "../Models/IPokeApiDetailsResponse";

export class PokemonService {
  private static instance: PokemonService;
  private readonly pokeApiDefaultUrl: string = "https://pokeapi.co/api/v2/pokemon";
  private fullPokemonListUrl!: string;
  private static pokemon: Array<Pokemon>;
  private static pokemonCount = 0;
  public pokemonLoaded = false;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() { }

  public static getInstance(): PokemonService {
    if (!PokemonService.instance) {
      this.initializeInstance();
    }
    return PokemonService.instance;
  }

  public static async initializeInstance() {
    if (PokemonService.instance) return;

    PokemonService.pokemon = new Array<Pokemon>;
    PokemonService.instance = new PokemonService();
    await PokemonService.instance.initializePokemonForSession();

  }

  private async initializePokemonForSession() {
    PokemonService.pokemonCount = await firstValueFrom(this.getTotalPokemonCount());
    this.fullPokemonListUrl = `${this.pokeApiDefaultUrl}?offset=0&limit=${PokemonService.pokemonCount}`;
    PokemonService.pokemon = await firstValueFrom(this.getAllPokemon());
  }

  private getTotalPokemonCount(): Observable<number> {
    return ajax.getJSON<IPokeApiResponse>(this.pokeApiDefaultUrl).pipe(
      map(response => {
        return response.count;
      }),
      catchError(error => {
        return throwError(() => new Error("Error getting pokemon sprite", error));
      })
    );
  }

  private getAllPokemon(): Observable<Pokemon[]> {
    return ajax.getJSON<IPokeApiResponse>(this.fullPokemonListUrl).pipe(
      map(response => {
        const pokemonResult = response.results;
        return pokemonResult;
      }),
      catchError(error => {
        return throwError(() => new Error("Error getting all pokemon", error));
      })
    );
  }

  // IPokeApiDetailsResponse will have to be built upon on a per needed bases. Currently only has the sprites
  public getPokemonDetailsByUrl(pokemon: Pokemon): Observable<IPokeApiDetailsResponse> {
    return ajax.getJSON<IPokeApiDetailsResponse>(pokemon.url).pipe(
      map(response => {
        pokemon.details = response;
        return response;
      }),
      catchError(error => {
        return throwError(() => new Error("Error getting pokemon details", error));
      })
    );
  }

  public getPokemonArray(): Array<Pokemon> {
    return PokemonService.pokemon;
  }

  public getPokemonCount(): number{
    return PokemonService.pokemonCount;
  }

}
