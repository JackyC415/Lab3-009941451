import { gql } from 'apollo-boost';

const getItemsQuery = gql`
    {
        items {
            name
            section
            restaurantName
            owner_id
            id
        }
    }
`;

export { getItemsQuery };