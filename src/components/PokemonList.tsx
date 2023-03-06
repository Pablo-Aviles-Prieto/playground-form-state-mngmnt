import { FC } from 'react';
import { useFetch } from '../utils/useData';
import { IPokeList } from '../interfaces/IPokemons';

export const PokemonList: FC = () => {
  const { data, error, isLoading } = useFetch<IPokeList>(
    'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'
  );

  if (error) return <h1>{error.message}</h1>;

  return (
    <>
      <h1>Pokemon List</h1>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        data?.results.map((pokeObj) => <p key={pokeObj.name}>{pokeObj.name}</p>)
      )}
    </>
  );
};
