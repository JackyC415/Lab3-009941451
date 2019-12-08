import { gql } from 'apollo-boost';

const getProfileQuery = gql`
    {
        getUserProfile {
            email
            firstName
            lastName
            restaurantName
            cuisine
            id
        }
    }
`;

export { getProfileQuery };