export const typeDefs = `#graphql
    type Query {
        me: User
        posts: [Post]
    }

    type Post {
        id: Int!
        title: String!
        content: String!
        author: User
        published: Boolean!
        createdAt: String!
    }
    
    type User {
        id: Int!
        name: String!
        email: String!
        createdAt: String!
        post: [Post]
    }
    
    type Profile {
        id: Int!
        bio: String!
        user: User!
        createdAt: String!
    }
`;
