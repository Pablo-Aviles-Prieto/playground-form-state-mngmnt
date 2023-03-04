import { FC } from 'react';
import { BasicForm, PropsForm } from './components';

export const App: FC = () => {
  return (
    <>
      <BasicForm />
      <hr style={{ margin: '30px 0' }} />
      <PropsForm />
    </>
  );
};
