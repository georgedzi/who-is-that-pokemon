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
  const [guess, setGuess] = useState<string>("");
  
  // adding debounce to prevent annoying flicker in strict mode
  const getPokemonDetails = debounce((requestedPokemon: Pokemon) => {
    if (!requestedPokemon.details) {
      pokemonServiceInstance.getPokemonDetailsByUrl(requestedPokemon).subscribe(pokemonDetails => {
        if (!pokemonDetails.sprites.front_default) {
          guessNextPokemon();
        }
        setPokemon(requestedPokemon);
      });
    }
    else{
      setPokemon(requestedPokemon);
    } 
  });

  const guessNextPokemon = () => {
    setPokemon(new Pokemon());
    setGuess("");
    pokemonToGuess = getRandomNumber(pokemonCount);
    getPokemonDetails(allPokemon[pokemonToGuess]);
  };

  const checkValue = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (guess.toLowerCase() === pokemon.name.toLowerCase()) {
      console.log("Correct");
      guessNextPokemon();
    } else {
      console.log("Wrong");
    }
  };

  useEffect(() => {
    guessNextPokemon();
  }, []);

  return (
    <>
      {!pokemon.details && <div>Loading...</div>}
      <img width="400px" src={pokemon.details?.sprites.front_default}></img>
      <div style={{fontSize: "26px"}}>{pokemon.details && `${pokemon.name} ${pokemon.details.id} ${pokemon.url}`}</div>

      <button onClick={guessNextPokemon}>Next Pokemon</button>

          <div>
      <form onSubmit={checkValue}>
        <label>
          <input
            type="text"
            value={guess}
            onChange={(event) => setGuess(event.target.value)}
          />
        </label>
        <button type="submit">Check</button>
      </form>
    </div>
    </>
  );
}

export default WhosThatPokemon;
