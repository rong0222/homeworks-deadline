import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import fetch from 'node-fetch';
import moment from 'moment'
const HOW_MANY_DAY = 6;
const today = moment().format('YYYY-MM-DD');
const calendarDueDate = moment().add(HOW_MANY_DAY, 'days').calendar();
const dueDate = moment().add(HOW_MANY_DAY, 'days').format('YYYY-MM-DD');

import ExamList from './ExamList';

class App extends Component {
  constructor(...args) {
    super(...args);

    this.client = new ApolloClient({
      link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors)
            graphQLErrors.map(({ message, locations, path }) =>
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
              ),
            );
          if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        new HttpLink({
          fetch,
          uri: 'https://eu1.prisma.sh/ming-der-wang-e80def/homeworks-deadline/dev',
          credentials: 'same-origin'
        })
      ]),
      cache: new InMemoryCache()
    });

  }
  render() {
    return (
      <ApolloProvider client={this.client}>
        <h1>By {HOW_MANY_DAY} days later on {calendarDueDate}, ({dueDate})</h1>
        <ExamList dueDate={dueDate} today={today} />
      </ApolloProvider>
    );
  }
}

export default App;
