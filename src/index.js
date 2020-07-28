import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import GlobalStyle from './GlobalStyles';
import { GraphQLClient, ClientContext } from 'graphql-hooks';

const client = new GraphQLClient({
  url: 'https://graphql.datocms.com/',
  headers: {
    Authorization: 'a84744a370cff148167fddf424b82d',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ClientContext.Provider value={client}>
      <App />
      <GlobalStyle />
    </ClientContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
