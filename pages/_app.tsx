import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FavouriteProvider } from '../context/FavouriteContext'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return <MantineProvider
  withGlobalStyles
  withNormalizeCSS
  theme={{
    /** Put your mantine theme override here */
    colorScheme: 'dark',
  }}
>
  <QueryClientProvider client={queryClient}>
    <FavouriteProvider>
      <Component {...pageProps} />
    </FavouriteProvider>
  </QueryClientProvider>
</MantineProvider>
}

export default MyApp
