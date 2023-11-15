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
            bio: String
        ) : AuthPayload,
        
        signin (
            email: String!
            password: String!
        ): AuthPayload,
        
        addPost(post: PostInput!) : PostPayload,
        updatePost(postId: ID!, post: PostInput!) : PostPayload,
        deletePost(postId: ID!) : PostPayload
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
    
    type AuthPayload {
        userError: String
        token: String
    }
    
    type PostPayload {
        userError: String
        post: Post
    }
    
    input PostInput {
        title: String
        content: String
    }
`;
