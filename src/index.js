// import {GraphQLServer} from 'graphql-yoga';


// //String, Boolean, INt , Float, ID

// // Type definitions

// const posts = [
//     {
//         id : "abc12",
//         title : "lorem ipsum",
//         body : "something is here",
//         published : false
//     },
//     {
//         id : "abc21",
//         title : "lorem ipsum 2",
//         body : "something is here 2",
//         published : false
//     },
//     {
//         id : "abc12 3",
//         title : "lorem ipsum3",
//         body : "something is here3 ",
//         published : false
//     }
// ]

// const typeDefs = `
//     type Query {
//         greet(name: String!) : String!
//         me : User!
//         add(numbers: [Float!]!) : Float!
//         users: [User!]!
//         posts(query : String) : [Post!]!
//     }

//     type User { 
//         id: ID!
//         name: String!
//         email: String!
//         age: Int
//     }

//     type Post {
//         id : ID!
//         title : String!
//         body : String!
//         published : Boolean!
//     }
// `

// // Resolvers.

// const resolvers = {
//     Query : {
//         greet(parent, args, ctx, info){
//             return `Hello ${args.name}`
//         },
//         users(){
//             return [{
//                 id : "abc12",
//                 name : "nafri",
//                 email : "irfan@banjaxed",
//                 age : 22
//             },
//             {
//                 id : "abc323",
//                 name : "irfan",
//                 email : "irfan@banjaxed",
//                 age : 22
//             }
//         ]
//         },
//         me() {
//             return {
//                 id : "id12",
//                 name : "nafri",
//                 email : "irfan@banjaxed.com"
//             }
//         },
//         add(parent, args, ctx, info){
//             if(args.numbers.lenght === 0)
//             {    
//                 return 0;
//             }
            
//             return args.numbers.reduce((accumulator, currentValue) => {
//                 return accumulator + currentValue;
//             })
//         },
//         posts(parent, args, cfx, info) {
//             if(!args.query) return posts;
//             return posts.filter((post) => {
//                 if(post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase()))
//                 {
//                     return post;
//                 }
//             }
//         )}
//     }
// }

// const server = new GraphQLServer({
//     typeDefs : typeDefs,
//     resolvers : resolvers
// })

// server.start(() => console.log("The server is up and running."))


///////ReLational Schemas Starts here.



import {GraphQLServer} from 'graphql-yoga';
import uuid from "uuid/v4"

//String, Boolean, INt , Float, ID

// Type definitions

let posts = [
    {
        id : "1",
        title : "lorem ipsum",
        body : "something is here",
        published : false,
        author : '2'
    },
    {
        id : "2",
        title : "lorem ipsum 2",
        body : "something is here 2",
        published : false,
        author : '1'
    },
    {
        id : "3",
        title : "lorem ipsum3",
        body : "something is here3 ",
        published : false,
        author : '1'
    }
]
let users = [{
    id : "1",
    name : "user # 1",
    email : "nafri@banjaxed",
    age : 22
},
{
    id : "2",
    name : "user # 2 ",
    email : "irfan@banjaxed",
    age : 19
}
]
let comments = [
    {
        id : '1',
        text : 'text1', 
        author : '1',
        postID : '1',
    },
    {
        id : '2',
        text : 'text2',
        author : '1',
        postID : '3',
    },
    {
        id : '3', 
        text : 'text3',
        author : '2',
        postID : '2',
    },
    {
        id : '4', 
        text : 'text4',
        author : '2',
        postID : '1',
    }

]

const typeDefs = `
    type Query {
        greet(name: String!) : String!
        me : User!
        add(numbers: [Float!]!) : Float!
        users: [User!]!
        posts(query : String) : [Post!]!
        comments: [Comment!]!
    }

    type Mutation {
        createUser(data : createUserInput): User!
        createPost(data : createPostInput) : Post!
        createComment(data : createCommentInput ) : Comment!
        deletePost(id : ID!) : Post!
    }

    input createUserInput{
        name : String!
        email : String!
        age : Int
    }
    input createPostInput{
        title : String!
        body : String!
        published : Boolean!
        author : ID!
    }
    input createCommentInput{
        text : String!
        author : ID!
        post : ID!
    }

    type User { 
        id: ID!
        name: String!
        email: String!
        age: Int
        posts : [Post!]!
        comments : [Comment]!
    }

    type Post {
        id : ID!
        title : String!
        body : String!
        published : Boolean!
        author : User!
    }
    type Comment{
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`
// Resolvers.
const resolvers = {
    Query : {
        greet(parent, args, ctx, info){
            return `Hello ${args.name}`
        },
        users(){
            return users
        },
        me() {
            return {
                id : "id12",
                name : "nafri",
                email : "irfan@banjaxed.com"
            }
        },
        add(parent, args, ctx, info){
            if(args.numbers.lenght === 0)
            {    
                return 0;
            }
            
            return args.numbers.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            })
        },
        posts(parent, args, cfx, info) {
            if(!args.query) return posts;
            return posts.filter((post) => {
                if(post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase()))
                {
                    return post;
                }
            }
        )},
        comments() {
            return comments;
        }
    },
    Mutation : {
        createUser(parent, args, ctx, info){
            const emailTaken = users.some((user) => user.email === args.data.email)
            if (emailTaken){
                throw new Error('Email taken');
            }

            const user = {
                id : uuid(),
                ...args.data
            }

            users.push(user);
            return user;
            console.log(args);
        }, 
        createPost(parent, args, ctx, info){
            const exist = users.some( user => user.id ===  args.data.author)
            if(!exist) throw Error("User not found");

            const post = {
                id : uuid(),
                ...args.data
            }
            posts.push(post);

            return post;
        },
        createComment(parent, args, ctx, info){
            const user = users.some( user => user.id ===  args.data.author);
            const post  = posts.some( post => post.id === args.data.post && post.published)

            if(!user || !post) throw new Error("something is wrong");
            const comment = {
                id : uuid(),
              ...args.data,
            }
            comments.push(comment);
            return comment;
        },
        deletePost(parent, args, ctx, info){
            const postIndex = posts.findIndex(post => post.id === args.id)
            if (postIndex === -1){
                throw new Error("Post not found");
            }

            comments = comments.filter((comment) => comment.postID !== args.id);

            const delPost = posts.splice(postIndex, 1);
            console.log(delPost);
            return delPost[0];
        }
        // deleteUser(parent, args, ctx, info) {
        //     const userIndex = users.findIndex((user) => user.id === args.id)
        //     if (userIndex === -1){
        //         throw new Error("user not found"); 
        //     }
        //     const deletedUser = users.splice(userIndex, 1);
        //     posts = post.filter((post) => {
        //         const match  = post.author === args.id
        //         if(match) {
        //             comments = comment.filter()
        //         }
        //     })
        // }
    },
    Post : {
        author(parent, args, cfx, info){
            return users.find((user) => {
                return user.id === parent.author
            })
        }
    },
    User : {
        posts(parent, args, cfx, info) {
            return posts.filter((post) => {
                return (post.author === parent.id)
            })
        },
        comments(parent, args, cfx, info){
            return comments.filter((comment) => {
                return comment.author == parent.id;
            })
        }
    },
    Comment : {
        author(parent, args, cfx, info){
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, cfx, info) {
            return posts.find((post) => {
                return post.id === parent.postID;
            })
        }
    }

}

const server = new GraphQLServer({
    typeDefs : typeDefs,
    resolvers : resolvers
})

server.start(() => console.log("The server is up and running."))