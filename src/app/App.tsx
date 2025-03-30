import './style/index.css';
import { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const App: FC = () => {

  const queryClient = new QueryClient()

  return (
    <div className='app'>
      <QueryClientProvider client={queryClient}>
      </QueryClientProvider>
    </div>
  );
};
