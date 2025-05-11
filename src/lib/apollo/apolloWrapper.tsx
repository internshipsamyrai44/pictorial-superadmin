'use client';

import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import React from 'react';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';

const httpLink = createHttpLink({
  uri: 'https://inctagram.work/api/v1/graphql'
});

const wsClient = createClient({
  url: 'wss://inctagram.work/api/v1/graphql',
  connectionParams: () => {
    const token = Cookies.get('authToken');
    return {
      Authorization: token ? `Basic ${token}` : ''
    };
  },
  retryAttempts: 5,
  connectionAckWaitTimeout: 10000,
  shouldRetry: () => true,
  on: {
    connected: () => console.log('WebSocket connected'),
    closed: () => console.log('WebSocket closed'),
    error: (error) => console.error('WebSocket error:', error)
  },
  lazy: false,
  keepAlive: 10000,
  retryWait: async (retries) => {
    // Экспоненциальная задержка между попытками переподключения
    const delay = Math.min(1000 * Math.pow(2, retries), 10000);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
});

const wsLink = new GraphQLWsLink(wsClient);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('authToken');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Basic ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
    mutate: {
      fetchPolicy: 'network-only',
    },
  },
  connectToDevTools: true
});

export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
