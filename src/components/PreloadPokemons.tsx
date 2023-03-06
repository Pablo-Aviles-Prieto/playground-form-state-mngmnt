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
    <div className='mx-20'>
      <h1 className='my-4 text-4xl font-bold text-center underline'>
        Preload Pokemons
      </h1>
      <ul>
        {allPokemon.map((pokemon) => (
          <li className='text-lg' key={pokemon.name}>
            {pokemon.name}
          </li>
        ))}
      </ul>
      {isLoadingPokemon && (
        <h1 className='my-4 text-2xl font-bold'>Loading...</h1>
      )}
      <button
        className='px-6 py-3 my-5 transition-all duration-500 border rounded-md shadow-lg text-violet-900 bg-violet-300 border-violet-900 hover:bg-violet-600 hover:scale-105 hover:text-violet-200 hover:shadow-2xl'
        onClick={handleClick}
      >
        Load more pokemons
      </button>
    </div>
  );
};
