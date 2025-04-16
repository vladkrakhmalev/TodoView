import './style/index.css';
import { FC } from 'react';
import { Calendar } from '@widgets/calendar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTheme } from '@shared/lib/theme';

export const App: FC = () => {
  const { theme } = useTheme()
  const queryClient = new QueryClient()

  return (
    <div className='app' data-theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Calendar/>
      </QueryClientProvider>
    </div>
  );
};
