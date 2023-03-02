import React, { useEffect, useState } from "react";
import { PokemonService } from "../../Services/PokemonService";
import { Pokemon } from "../../Models/Pokemon";
import debounce from "lodash/debounce";

const getRandomNumber = (range: number) => {
  return Math.floor(Math.random() * range);
};

function WhosThatPokemon() {

  const pokemonServiceInstance = PokemonService.getInstance();
  const allPokemon = pokemonServiceInstance.getPokemonArray();
  const pokemonCount = pokemonServiceInstance.getPokemonCount();

  let pokemonToGuess = getRandomNumber(pokemonCount);

  const [pokemon, setPokemon] = useState<Pokemon>(new Pokemon());
  
  // adding debounce to prevent annoying flicker in strict mode
  const getPokemonDetails = debounce((requestedPokemon: Pokemon) => {
    if (!requestedPokemon.details) {

      pokemonServiceInstance.getPokemonDetailsByUrl(requestedPokemon.url).subscribe(pokemonDetails => {
        if (!pokemonDetails.sprites.front_default) {
          guessNextPokemon();
          return;
        }
        const updatedPokemon = { ...requestedPokemon, details: pokemonDetails };
        setPokemon(updatedPokemon);
      });
    } else {
      setPokemon(requestedPokemon);
      console.log("reused data");
    }
  });

  const guessNextPokemon = () => {
    pokemonToGuess = getRandomNumber(pokemonCount);
    getPokemonDetails(allPokemon[pokemonToGuess]);
  };

  useEffect(() => {
    guessNextPokemon();
  }, []);

  return (
    <>
      {!pokemon.details && <div>Loading...</div>}
      <img width="400px" onLoad={() => console.log("image loaded")} src={pokemon.details?.sprites.front_default}></img>
      <div>{pokemon.details && `${pokemon.name} ${pokemon.details.id} ${pokemon.url}`}</div>

      <button onClick={guessNextPokemon}>Next Pokemon</button>
    </>
  );
}

export default WhosThatPokemon;
