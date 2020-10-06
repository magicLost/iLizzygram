import gql from "graphql-tag";

export const schema = gql`
  extend type User {
    age: Int
  }

  enum AlertType {
    SUCCESS
    ERROR
  }

  type Alert {
    isShow: Boolean!
    type: AlertType!
    message: String!
  }

  extend type Query {
    alert: Alert!
  }

  extend type Mutation {
    showAlert(message: String!, type: AlertType!): Alert
    hideAlert: Alert
  }
`;
