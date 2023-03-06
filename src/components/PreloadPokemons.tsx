import { FC, useEffect, useState } from 'react';
import useSWR, { preload } from 'swr';
import { fetcher, useFetch } from '../utils/useData';
import { IPokeList } from '../interfaces/IPokemons';

const limitOffset = 5;

export const PreloadPokemons: FC = () => {
  const [offset, setOffset] = useState(0);
  const [allPokemon, setAllPokemon] = useState([] as IPokeList['results']);
  const {
    data: pokemonList,
    error: pokemonError,
    isLoading: isLoadingPokemon,
  } = useFetch<IPokeList>(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limitOffset}`,
    {
      onSuccess: (data) => {
        setAllPokemon((prevData) => [...prevData, ...data.results]);
      },
    }
  );

  useEffect(() => {
    preload(
      `https://pokeapi.co/api/v2/pokemon/?offset=${
        offset + limitOffset
      }&limit=${limitOffset}`,
      fetcher
    );
  }, [offset]);

  const handleClick = () => {
    setOffset((prevOffset) => prevOffset + limitOffset);
  };

  return (
    <div>
      <h1>Preload Pokemons</h1>
      <ul>
        {allPokemon.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
      {isLoadingPokemon && <h1>Loading...</h1>}
      <button onClick={handleClick}>Load more pokemons</button>
    </div>
  );
};
