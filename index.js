// implement your API here

const express = require('express');

const Users = require('./data/db');

const server = express();

server.use(express.json());

// GET to '/'
server.get('/', function(req, res) {
  res.send({ hello: 'Hello from node-api1-project, in index.js!' });
});

// GET list of users
server.get('api/users', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
      console.log('res in hubs GET request: ', res)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: 'error getting list of users in index.js, server.get, Users.find' })
    })
})

// GET user by id
server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;

  Users.findById(id)
    .then(user => {
      res.status(200).json(user);
      console.log(`findByID ${id} worked!`)
    })
})

