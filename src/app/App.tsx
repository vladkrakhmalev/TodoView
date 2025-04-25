import './style/index.css';
import { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTheme } from '@shared/lib/theme';
import { RouterProvider } from 'react-router';
import { router } from './router';

export const App: FC = () => {
  const { theme } = useTheme()
  const queryClient = new QueryClient()

  return (
    <div className='app' data-theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
};
