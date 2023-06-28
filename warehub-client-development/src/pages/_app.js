import * as React from 'react'
import { ChakraProvider, 
ColorModeScript, Grid, Box } from '@chakra-ui/react'
import theme from '../styles/theme'
import Navbar from '../components/styleComponents/Navbar'
import Sidebar from '@/components/styleComponents/Sidebar'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isRootPage = router.pathname === '/' || router.pathname === '/register';
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Grid
          height="100vh"
          templateRows="auto 1fr"
          templateColumns="1fr"
          gap={0}
          >
             {!isRootPage && (
              <Box w="100%" p={4} pb={0}>
                <Navbar />
              </Box>
              )}
            <Grid templateColumns="auto 1fr" height="100%">
                {!isRootPage && (
                <Box>
                  <Sidebar />
                </Box>
              )}
              <Box p={5}>
                <Component {...pageProps} />
              </Box>
            </Grid>
          </Grid>
    </ChakraProvider>
  );
}