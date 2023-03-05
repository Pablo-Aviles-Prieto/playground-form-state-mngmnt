import { FC } from 'react';
import { BasicForm, PropsForm } from './components';
import { useData } from './utils/fetcher';
import { IPokeList, ISinglePokemon } from './interfaces/IPokemons';

export const App: FC = () => {
  const { data, error, isLoading } = useData<IPokeList>(
    'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20'
  );

  const {
    data: dataPokemon,
    error: errorPokemon,
    isLoading: isLoadingPokemon,
  } = useData<ISinglePokemon>('https://pokeapi.co/api/v2/pokemon/1/');

  console.log('dataPokemon', dataPokemon);
  console.log('errorPokemon', errorPokemon);
  console.log('isLoadingPokemon', isLoadingPokemon);

  if (error) return <h1>{error.message}</h1>;
  // if (errorPokemon) return <h1>{errorPokemon.message}</h1>;

  return (
    <>
      <BasicForm />
      <hr style={{ margin: '30px 0' }} />
      <PropsForm />
      <hr style={{ margin: '30px 0' }} />
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
      <hr style={{ margin: '30px 0' }} />
      <h1>Pokemon List</h1>
      {data?.results.map((pokeObj) => (
        <p key={pokeObj.name}>{pokeObj.name}</p>
      ))}
    </>
  );
};
