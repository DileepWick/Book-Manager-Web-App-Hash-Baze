import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// HTTP link
const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql",
  credentials: "include", // send cookies with every request
});

// Apollo Client
const client = new ApolloClient({
  link: httpLink, 
  cache: new InMemoryCache(),
});

export default client;
