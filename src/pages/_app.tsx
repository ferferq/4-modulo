import { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps } : AppProps) {
  return (
    //resetCSS=false - mantem as configuracaos do broswer.
  <ChakraProvider resetCSS theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
  )
}

export default MyApp
