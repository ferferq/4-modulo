import { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { theme } from '../styles/theme';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext'
import { makeServer } from '../services/mirage';
import { queryClient } from '../services/react-query/queryClient';

if (process.env.NODE_ENV !== 'production') {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    //resetCSS=false - mantem as configuracaos do broswer.
    <QueryClientProvider client={queryClient}>
    <ChakraProvider resetCSS theme={theme}>
      <SidebarDrawerProvider>
          <Component {...pageProps} />
      </SidebarDrawerProvider>
    </ChakraProvider>

    <ReactQueryDevtools />
  </QueryClientProvider>

  )
}

export default MyApp
