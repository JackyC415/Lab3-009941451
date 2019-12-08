import { gql } from 'apollo-boost';

const registerMutation = gql`
    mutation Register($firstName: String, $lastName: String, $email: String, $password: String, $restaurantName: String, $cuisine: String, $owner: Boolean){
        registerUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, restaurantName: $restaurantName, cuisine: $cuisine, owner: $owner){
            firstName
            lastName
            email
            password
            restaurantName
            cuisine
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

const logoutMutation = gql`
    mutation NavbarPage($email: String){
        logoutUser(email: $email){
        email
    }
}
`;

const updateProfileMutation = gql`
    mutation Profile($firstName: String, $lastName: String, $email: String, $restaurantName: String, $cuisine: String){
        updateProfile(firstName: $firstName, lastName: $lastName, email: $email, restaurantName: $restaurantName, cuisine: $cuisine){
        firstName
        lastName
        email
        restaurantName
        cuisine
    }
}
`;

export { registerMutation, loginMutation, logoutMutation, updateProfileMutation };