import React, { useState } from "react";

interface Props {
    onSubmit: (_guess: string) => void
}

function PokemonGuessForm(props: Props) {
    const [guess, setGuess] = useState<string>("");

    const checkValue = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onSubmit(guess);
    };

    return (
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
    );
}


export default PokemonGuessForm;
