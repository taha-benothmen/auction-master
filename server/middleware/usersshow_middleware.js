// middleware.js

const db = require('../mysql/mysql');

  
  const getUserByUsername = (username) => {
    return users.find((user) => user.username === username);
  };
  
  const middleware = {
    getUsers: (req, res) => {
      res.json(users);
    },
  
    getUser: (req, res) => {
      const { username } = req.params;
      const user = getUserByUsername(username);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    },
  
    deleteUser: (req, res) => {
      const { username } = req.params;
      const index = users.findIndex((user) => user.username === username);
      if (index !== -1) {
        users.splice(index, 1);
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    },
  
    editUser: (req, res) => {
      const { username } = req.params;
      const { name, school_name, description } = req.body;
      const user = getUserByUsername(username);
      if (user) {
        user.name = name || user.name;
        user.school_name = school_name || user.school_name;
        user.description = description || user.description;
        res.json({ message: 'User updated successfully', user });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    },
  };
  
  module.exports = middleware;
  