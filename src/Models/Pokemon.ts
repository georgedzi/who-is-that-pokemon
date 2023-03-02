import { IPokeApiDetailsResponse } from "./IPokeApiDetailsResponse";

export class Pokemon {
    id: number;
    name: string;
    url: string;
    details!: IPokeApiDetailsResponse;

    constructor(id = 0, name = "", url = "") {
        this.id = id;
        this.name = name;
        this.url = url;
    }
}