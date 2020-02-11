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
server.get('/api/users', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
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
      if(user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    })
})

// create a new User with POST
server.post('/api/users', (req, res) => {
  const userData = req.body;
  console.log(`post request body.name: ${req.body.name}`)

  if(req.body.name === null || req.body.bio === null || req.body.name === '' || req.body.bio === '') {
    res.status(400).json({ errorMessage: 'Please provide a name and bio!' })
  } else {
    Users.insert(userData)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: 'There was an error while saving the user to the database' })
    })
  }
})

// delete a user
server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;

  Users.remove(id)
    .then(removed => {
      if(removed > 0) {
        res.status(200).json({ message: 'User removed' })
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: 'Error removing user' })
    })
})

// update user with PUT
// still need to figure out how to respond with the complete updated object
server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const user = req.body;

  Users.update(id, user)
    .then(updated => {
      if(req.body.name === null || req.body.bio === null || req.body.name === '' || req.body.bio === '') {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
      } else if(updated) {
        res.status(200).json(updated)
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: 'Error updating the user' })
    })
});

const port = 7000;
server.listen(port, () => console.log(`** Server listening on port ${port} in node-api1-project! **`));
