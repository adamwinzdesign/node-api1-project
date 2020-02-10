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
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: 'The user with the specified ID does not exist.' })
    })
})

// create a new User with POST
server.post('/api/users', (req, res) => {
  const userData = req.body;
  // validation will go here once we learn how

  // still need to add logic if req.body is missing name or bio!

  Users.insert(userData)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: 'There was an error while saving the user to the database' })
    })
})

// delete a user
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;

  Users.remove(id)
    .then(removed => {
      res.status(200).json(removed)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: 'Error removing user' })
    })
})

// update user with PUT
server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const user = req.body;

  Users.update(id, user)
    .then(updated => {
      res.status(204).json(updated);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: 'Error updating the user' })
    })
});

const port = 7000;
server.listen(port, () => console.log(`** Server listening on port ${port} in node-api1-project! **`));
