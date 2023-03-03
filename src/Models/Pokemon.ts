import { IPokeApiDetailsResponse } from "./IPokeApiDetailsResponse";
import { SpritesUrls } from "./PokemonDetails/SpriteUrls";

export class Pokemon {
    name: string;
    url: string;
    details!: IPokeApiDetailsResponse;

    constructor(name = "", url = "") {
        this.name = name;
        this.url = url;
        this.details = {
            sprites: new SpritesUrls(),
            id: 0
        };
    }
}