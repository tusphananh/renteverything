import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import { ActivitiesProvider } from '../contexts/activitiesContext'
import { AuthProvider } from '../contexts/authContext'
import { SearchProvider } from '../contexts/searchContext'
import { useApollo } from '../libs/apolloClient'
import '../styles/globals.css'


function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <SearchProvider>
          <ActivitiesProvider>
            <Component {...pageProps} />
          </ActivitiesProvider>
        </SearchProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}
export default MyApp
