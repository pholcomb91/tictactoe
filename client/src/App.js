import React from "react";
import { 
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
  
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketContext, socket } from './utils/socket';


import Header from "./components/header";
import Game from "./components/game";
import HomePage from "./pages/homePage";
import Login from "./pages/login";
import SignUp from "./pages/signup";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createHttpLink({
  uri: '/graphql',
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <SocketContext.Provider value = {socket}>
      <Router>
        <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/game" element={<Game />} />
          </Routes>
      </Router>
      </SocketContext.Provider>
    </ApolloProvider>
  );
}

export default App;
