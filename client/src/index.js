import React from 'react';
import { render } from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache()
});


const GameQuery = gql`
  query GameQuery {
    games {
      title
      genre
      price
    }
  }
`;

const BookQuery = gql`
  query BookQuery {
    books {
      title
      author
      price
    }
  }
`;

function Games() {
  const { loading, error, data } = useQuery(GameQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.games.map(({ title, genre, price }) => (
    <div key={title}>
      <p>
        {title}: {genre}: {price}
      </p>
    </div>
  ));
}

function Books() {
  const { loading, error, data } = useQuery(BookQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.books.map(({ title, author, price }) => (
    <div key={title}>
      <p>
        {title}: {author}: {price}
      </p>
    </div>
  ));
}

function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <h3>Games</h3>
      <Games />
      <h3>Books</h3>
      <Books />
    </div>
  );
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);