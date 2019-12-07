
import { gql } from 'apollo-boost';

const registerMutation = gql`
    mutation Register($firstName: String, $lastName: String, $email: String, $password: String, $restaurantName: String, $cuisine: String, $owner: Boolean){
        registerUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, restaurantName: $restaurantName, cuisine: $cuisine, owner: $owner){
            firstName
            id
        }
    }
`;

const loginMutation = gql`
    mutation Login($email: String, $password: String){
        loginUser(email: $email, password: $password){
            email
            id
        }
    }
`;

export {registerMutation, loginMutation};