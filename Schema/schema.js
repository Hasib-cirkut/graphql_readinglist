const graphql = require('graphql')
const _ = require('lodash')

const Book = require('../Model/book')
const Author = require('../Model/author')

const {GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema, 
        GraphQLID, 
        GraphQLInt,
        GraphQLList
    } = graphql

/*

const Books = [
    {name: 'Harry potter and the goblet of fire', genre: 'fantasy', id: '1', authorid: '1'},
    {name: 'The Lord of the Rings',               genre: 'fantasy', id: '2', authorid: '2'},
    {name: 'A Game of Thrones',                   genre: 'fantasy', id: '3', authorid: '3'},
    {name: 'The Winds of Winter',                 genre: 'fantasy', id: '4', authorid: '3'},
    {name: 'The Hobbit',                          genre: 'fantasy', id: '5', authorid: '2'}
]

const Authors = [
    {name: 'J. K. Rowling',         age: 54, id: '1'},
    {name: 'J. R. R. Tolkien',      age: 81, id: '2'},
    {name: 'George R. R. Martin',   age: 71, id: '3'},
]

*/


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
             //   return _.find(Authors, {id: parent.authorid})

            
            return Author.findById(parent.authorid)
            }
        }
    })

})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
            //    return _.filter(Books, {authorid: parent.id})

            return Book.find({authorid: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields:{
        book: {
            type:BookType,
            args: {id : {type: GraphQLID}},
            resolve(parent, args){
                //fetch data from db

            //    return _.find(Books, {id: args.id})

            return Book.findById(args.id)
            }
        },
        author:{
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
            //    return _.find(Authors, {id: args.id})

            return Author.findById(args.id)
            }
        },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args){
            
            return Book.find({})
            }
        },
        authors: {
            type: GraphQLList(AuthorType),
            resolve(parent, args){
            //    return Authors

            return Author.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor:{
            type: AuthorType,
            args:{
                name: {type: GraphQLString},
                age : {type: GraphQLInt}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age : args.age
                })

                return author.save()
            }
        },

        addBook:{
            type: BookType,
            args:{
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorid: {type: GraphQLID}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorid: args.authorid
                })

                return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})