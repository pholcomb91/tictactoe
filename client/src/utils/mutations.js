import { gql } from '@apollo/client';

export const GET_USER = gql`
    query getUser ($userId: ID!) {
        user(userId: $userId) {
            username
            email
            wins
            losses
            ties
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            profile {
                _id
                name
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($userName: String!, $email: String!, $password: String!) {
        addUser(userName: $userName, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;
export const UPDATE_USER_NAME = gql`
     mutation updateUserName($id: ID!, $name: String!) {
            updateUserName(id: $id, name: $name) {
                name
            }
        }
`;