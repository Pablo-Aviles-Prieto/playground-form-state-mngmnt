import { FC } from 'react';
import { useFetch } from '../utils/useData';
import { ISinglePokemon } from '../interfaces/IPokemons';

export const SinglePokemon: FC = () => {
  const {
    data: dataPokemon,
    error: errorPokemon,
    isLoading: isLoadingPokemon,
  } = useFetch<ISinglePokemon>('https://pokeapi.co/api/v2/pokemon/1/');
  console.log('errorPokemon', errorPokemon?.message);
  return (
    <>
      <h1>Single pokemon</h1>
      {isLoadingPokemon ? (
        <p>Loading Pokemon</p>
      ) : dataPokemon ? (
        <>
          <p>ID: {dataPokemon.id}</p>
          <p>Poke nombre: {dataPokemon.name}</p>
        </>
      ) : (
        <h1>{errorPokemon && errorPokemon.message}</h1>
      )}
    </>
  );
};
