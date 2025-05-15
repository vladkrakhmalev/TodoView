import './style/index.css'
import { FC, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTheme } from '@shared/lib/theme'
import { RouterProvider } from 'react-router'
import { router } from './router'
import { Spiner } from '@shared/ui/spiner'
import '@shared/config/i18n'

export const App: FC = () => {
  const { theme } = useTheme()
  const queryClient = new QueryClient()

  return (
    <div id='app' className='app' data-theme={theme}>
      <Suspense fallback={<Spiner fullScreen />}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Suspense>
    </div>
  )
}
