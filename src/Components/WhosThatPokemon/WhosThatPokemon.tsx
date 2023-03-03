import React from "react";
import PokemonSprite from "../PokemonSprite/PokemonSprite";
import PokemonGuessForm from "../PokemonGuessForm/PokemonGuessForm";

import useWhosThatPokemon from "./useWhosThatPokemon";

function WhosThatPokemon() {
  const {
    pokemon,
    guessPokemonSubmit
  } = useWhosThatPokemon();
  
  return (
    <>
      <PokemonSprite sprites={pokemon.details?.sprites}></PokemonSprite>
      <PokemonGuessForm onSubmit={guessPokemonSubmit}></PokemonGuessForm>
    </>
  );
}

export default WhosThatPokemon;
