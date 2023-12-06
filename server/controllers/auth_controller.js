const jwt = require('jsonwebtoken');
const { verifyUser, verifyAdmin } = require('../middleware/auth_middleware');

exports.process_login = async (req, res) => {
  const { username, password } = req.body;

  // Find the user with the given username and password in the users array (replace this with a database query)
  const validLogin = await verifyUser(username, password);
  if (validLogin) {
    const token = jwt.sign(
      {
        username: username,
      },
      'RANDOM-TOKEN',
      { expiresIn: '24h' }
    );

    res.status(201).send({
      username: username,
      token,
    });
  } else {
    // If the user is not found, return an error
    res.status(400).json({ message: 'Invalid Username or Password' });
  }
};

exports.process_login_admin = async (req, res) => {
  const { username, password } = req.body;

  // Find the user with the given username and password in the users array (replace this with a database query)
  const validLogin = await verifyAdmin(username, password);
  if (validLogin) {
    const token = jwt.sign(
      {
        username: username,
      },
      'RANDOM-TOKEN',
      { expiresIn: '24h' }
    );

    res.status(201).send({
      username: username,
      token,
    });
  } else {
    // If the user is not found, return an error
    res.status(400).json({ message: 'Invalid Username or Password' });
  }
}

