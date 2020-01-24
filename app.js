const express = require('express')
const graphqlHTTP = require('express-graphql')

require('dotenv').config()

const mongoose = require('mongoose')

const schema = require('./Schema/schema')

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))


mongoose.connect(`mongodb+srv://hasib:${process.env.MONGODB_PASS}@cluster0-ttjjv.mongodb.net/test?retryWrites=true&w=majority`)

mongoose.connection.once('open', ()=>{
    console.log('Database connection has been made');
    
})


app.listen(4000, ()=>console.log('listening to port 4000'))