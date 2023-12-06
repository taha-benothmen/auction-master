// controller.js
const user_middleware = require('../middleware/usersshow_middleware');

const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json()); // Parse JSON bodies

app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
