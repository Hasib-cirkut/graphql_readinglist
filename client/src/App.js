import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';

//components

import Books from './components/Books'
//graphQl setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {
  return (

    <ApolloProvider client={client} >
      <div className="App">
        <h1>My Reading List</h1>
        <Books />
      </div>
    </ApolloProvider>
    
  );
}

export default App;
