import React from "react";
import { ISpritesUrls } from "../../Models/PokemonDetails/ISpritesUrls";
import PropTypes from "prop-types";
import { SpritesUrls } from "../../Models/PokemonDetails/SpriteUrls";

interface Props {
  sprites: ISpritesUrls
}

function PokemonSprite(props: Props) {
  return (
    <img width="400px" src={props.sprites?.front_default}></img>
  );
}

PokemonSprite.propTypes = {
  sprites: PropTypes.instanceOf(SpritesUrls).isRequired,
};

export default PokemonSprite;
