import gql from "graphql-tag";

// QUERIES

export const AUTH = gql`
  query {
    auth @client
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;

export const LOGIN = gql`
  mutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      name
      role
    }
  }
`;
