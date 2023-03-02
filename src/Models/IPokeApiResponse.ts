import { Pokemon } from "./Pokemon";

export interface IPokeApiResponse {
    count: number;
    next: string;
    previous: string;
    results: Array<Pokemon>;
}