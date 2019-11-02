const express = require('express')
const app = express()
const mongoclient = require('mongodb').MongoClient
const graphql = require('express-graphql')
const graphqlTools = require('graphql-tools')

const glue = require('schemaglue')


let db = null
const url=  'mongodb://root:toortoor@mongo:27017'
console.log(url)
const door = 9000
const dbName = "teste"

mongoclient.connect(url, {useNewUrlParser: true , useUnifiedTopology: true}, function(error, cliente) {
    if(error) console.log("erro de conexao", error)
    else console.log("conectado com sucesso")

    db = cliente.db(dbName)
})

app.listen(door)
console.log(`servidor rodando em ${door}`)

function getCode(){//to generate a code
    try {
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth()
        const day =  date.getDate()
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()
        const mils  = date.getMilliseconds()
        const values = year+''+month+''+day+''+hours+''+minutes+''+seconds+''+mils
        const result = Number(parseFloat(Number(values)/2).toFixed(0))
        return result
    } catch (error) {
        console.log(error)
    }
}

const { schema, resolver } = glue('./graphql')

const schemas = graphqlTools.makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolver
})

app.use('/graphql', graphql({
    schema: schemas
}));