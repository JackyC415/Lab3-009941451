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

const getUserProfileMutation = gql`
    mutation Profile($email: String){
        getUserProfile(email: $email){
            email
            firstName
            lastName
            restaurantName
            cuisine
    }
}
`;

const updateUserProfileMutation = gql`
    mutation Profile($firstName: String, $lastName: String, $email: String, $restaurantName: String, $cuisine: String){
        updateUserProfile(firstName: $firstName, lastName: $lastName, email: $email, restaurantName: $restaurantName, cuisine: $cuisine){
        firstName
        lastName
        email
        restaurantName
        cuisine
    }
}
`;

const addItemMutation = gql`
    mutation AddItem($name: String, $section: String){
        addItem(name: $name, section: $section){
            name
            id
        }
    }
`;

export {
    registerMutation, loginMutation, getUserProfileMutation,
    updateUserProfileMutation, addItemMutation, logoutMutation
};