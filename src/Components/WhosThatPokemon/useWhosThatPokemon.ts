import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { Pokemon } from "../../Models/Pokemon";
import { PokemonService } from "../../Services/PokemonService";
import RandomNumber from "../../Utils/RandomNumber";

const useWhosThatPokemon = () => {
    const pokemonServiceInstance = PokemonService.getInstance();
    const allPokemon = pokemonServiceInstance.getPokemonArray();
    const pokemonCount = pokemonServiceInstance.getPokemonCount();
  
    let pokemonToGuess = RandomNumber(pokemonCount);
  
    const [pokemon, setPokemon] = useState<Pokemon>(new Pokemon());
  
    // adding debounce to prevent annoying flicker in strict mode
    const getPokemonDetails = debounce((requestedPokemon: Pokemon) => {
      if (!requestedPokemon.details) {
        pokemonServiceInstance.getPokemonDetailsByUrl(requestedPokemon).subscribe(pokemonDetails => {
          if (!pokemonDetails.sprites.front_default) {
            guessNextPokemon();
          }
          setPokemon(requestedPokemon);
          console.log(requestedPokemon.name);
        });
      }
      else {
        setPokemon(requestedPokemon);
      }
    });
  
    const guessNextPokemon = () => {
      if(pokemon.details.id != 0) setPokemon(new Pokemon());
      pokemonToGuess = RandomNumber(pokemonCount);
      getPokemonDetails(allPokemon[pokemonToGuess]);
    };
  
    const guessPokemonSubmit = (guess: string) => {
      if(guess.toLocaleLowerCase() === pokemon.name.toLowerCase()){
        console.log("Correct");
        guessNextPokemon();  
      }
      else{
        console.log("wrong");
      }
    };
  
    useEffect(() => {
      guessNextPokemon();
    }, []);

    return {
        pokemon,
        guessPokemonSubmit
    };
};

export default useWhosThatPokemon;