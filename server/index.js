const express = require("express");
const { ApolloServer, gql } = require('apollo-server-express');

    const games = [
    {
      title: "ポケットモンスターブリリアントダイアモンド",
      genre: "RPG",
      price: 5000
    },
    {
      title: "桃太郎電鉄 ~昭和 平成 令和も定番! ~",
      genre: "SUGOROKU",
      price: 7000
    }
  ];

  const books = [
    {
      title: "Harry Potter and the Sorcerer's stone",
      author: "J.K. Rowling",
      price: 2000
    },
    {
      title: "Jurassic Park",
      author: "Michael Crichton",
      price: 3000
    }
  ];

const typeDefs = gql`
type Query { games: [Game] }
type Game { title: String, genre: String, price: Int }
type Query { books: [Book] }
  type Book { title: String, author: String, price: Int }
`;

const resolvers = {
    Query: { games: () => games, books: () => books },
  };

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.start().then(_ => {
    server.applyMiddleware({ app });
    app.listen({ port: 8080 }, () =>
        console.log('Now browse to http://localhost:8080' + server.graphqlPath)
    )
   })

module.exports = app;