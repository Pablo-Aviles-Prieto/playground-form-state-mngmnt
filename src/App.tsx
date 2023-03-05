import { FC } from 'react';
import { BasicForm, PropsForm, SinglePokemon, PokemonList } from './components';

export const App: FC = () => {
  return (
    <>
      <BasicForm />
      <hr style={{ margin: '30px 0' }} />
      <PropsForm />
      <hr style={{ margin: '30px 0' }} />
      <SinglePokemon />
      <hr style={{ margin: '30px 0' }} />
      <PokemonList />
    </>
  );
};
