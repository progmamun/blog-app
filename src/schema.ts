export const typeDefs = `#graphql
    type Query {
        me: User
        users: [User]
        posts: [Post]
    }
    
    type Mutation {
        signup(
            name: String!
            email: String!
            password: String!
        ) : User
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
