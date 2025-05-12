'use client';

import React from 'react';
import Cookies from 'js-cookie';
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
    split
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {getMainDefinition} from '@apollo/client/utilities';
import {WebSocketLink} from '@apollo/client/link/ws';
import {SubscriptionClient} from 'subscriptions-transport-ws';

// HTTP link for queries & mutations
const httpLink = createHttpLink({
    uri: 'https://inctagram.work/api/v1/graphql',
    credentials: 'include',
});

// Auth link to inject Authorization header on HTTP and WS
const authLink = setContext((_, {headers}) => {
    const token = Cookies.get('authToken');
    console.log('HTTP Auth Token:', token);
    return {
        headers: {
            ...headers,
            ...(token ? {Authorization: `Basic ${token}`} : {}),
        },
    };
});

// SubscriptionClient for WebSocket (subscriptions-transport-ws)
const wsClient = new SubscriptionClient('wss://inctagram.work/api/v1/graphql', {
    reconnect: true,
    connectionParams: () => {
        const token = Cookies.get('authToken');
        console.log('WS Connecting with token:', token);
        return token ? {Authorization: `Basic ${token}`} : {};
    },
});

// Additional logs for WS client events
wsClient.onConnected(() => console.log('WS Client: Connected'));
wsClient.onReconnected(() => console.log('WS Client: Reconnected'));
wsClient.onDisconnected(() => console.log('WS Client: Disconnected'));
wsClient.onError((error: Error) => console.error('WS Client Error:', error));

// WebSocketLink wrapping wsClient
const wsLink = new WebSocketLink(wsClient);

// Split link: subscriptions -> WS, else -> HTTP
const splitLink = split(
    ({query}) => {
        const definition = getMainDefinition(query);
        // Narrow to OperationDefinitionNode
        if (
            definition.kind === 'OperationDefinition' &&
            'operation' in definition
        ) {
            const operation = definition.operation;
            console.log(`Routing operation '${operation}' to`,
                operation === 'subscription' ? 'WebSocket' : 'HTTP'
            );
            return operation === 'subscription';
        }
        // Default to HTTP for fragments or others
        console.log('Routing non-operation definition to HTTP');
        return false;
    },
    authLink.concat(wsLink),
    authLink.concat(httpLink)
);

// Apollo Client setup
const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

export const ApolloWrapper = ({children}: { children: React.ReactNode }) => (
    <ApolloProvider client={client}>{children}</ApolloProvider>
);
