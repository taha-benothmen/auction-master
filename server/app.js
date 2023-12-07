const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const socketManager = require('./socketManager');

const mysql = require('mysql');
const bodyParser = require('body-parser');



const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const listingsRouter = require('./routes/listings');
const schoolsRouter = require('./routes/schools');
const housingRouter = require('./routes/housing');
const commentsRouter = require('./routes/comments');
const addressRouter = require('./routes/addresses');
const notificationRouter = require('./routes/notifications');
const messagesRouter = require('./routes/messages');
const unitsRouter = require('./routes/units');
const reviewsRouter = require('./routes/reviews');
const topHousingRouter = require('./routes/top_housing');
const adminRouter = require('./routes/admin');

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const server = http.createServer(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/listings', listingsRouter);
app.use('/images', express.static('./images'));
app.use('/schools', schoolsRouter);
app.use('/housinginfo', housingRouter);
app.use('/comments', commentsRouter);
app.use('/addresses', addressRouter);
app.use('/notifications', notificationRouter);
app.use('/messages', messagesRouter);
app.use('/units', unitsRouter);
app.use('/reviews', reviewsRouter);
app.use('/tophousing', topHousingRouter);
app.use('/admin', adminRouter);
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});


const port = 1234;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// ! second section

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'auction-db'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

app.post('/addThemeEndpoint', (req, res) => {
  const { schoolName } = req.body;

  const sql = 'INSERT INTO schools(school_name) VALUES(?)';
  const values = schoolName;

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error adding theme query' });
      return;
    }

    res.json({ message: 'theme added successfully' });
  });
});
app.post('/updateTheme', (req, res) => {
  const { newTheme, oldTheme } = req.body;

  const sql = 'UPDATE schools SET school_name = ? WHERE school_name = ?';
  const values = [newTheme, oldTheme];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error updating theme' });
      return;
    }
    res.json({ message: 'theme updated successfully' });
  });
});

app.delete('/deletetheme', (req, res) => {
  const { schoolName } = req.body;

  const sql = `DELETE FROM schools WHERE school_name = ?`;
  const values = [schoolName];

  connection.query(sql, [schoolName], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error deleting theme' });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'theme not found' });
      return;
    }

    res.json({ message: 'theme deleted successfully' });
  });
});

app.get('/getAllRH', (req, res) => {
  const sql = "SELECT * FROM users WHERE IsRh = 1;"

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }

    res.json({ users: results }); // Send the query results as JSON response
  });
});

app.post('/addNewRhUser', (req, res) => {
  const { name, username, password } = req.body;

  const sql = `INSERT INTO users (username, name, password, IsRh) 
              VALUES (?, ?, ?, 1);`;
  const values = [username, name, password];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error adding theme query' });
      return;
    }

    res.json({ message: 'RH User added successfully' });
  });
});

app.delete('/deleteRhUser', (req, res) => {
  const { username } = req.body;

  const sql = `DELETE FROM users WHERE username = ?`;

  connection.query(sql, [username], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error deleting user' });
      return;
    }

    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({ message: 'User deleted successfully' });
  });
});


app.get('/getAllUserData/:username', (req, res) => {
  const { username } = req.params;

  connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
    if (error) {
      console.error('Error retrieving user data:', error);
      res.status(500).json({ error: 'Error retrieving user data' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json({ user: results[0] });
      }
    }
  });
});

app.post('/updateListingPrice', (req, res) => {
  const { listingId, newPrice } = req.body;

  const sql = 'UPDATE listings SET price = ? WHERE lid = ?';
  const values = [newPrice, listingId];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error updating price in listings' });
      return;
    }
    res.json({ message: 'Price updated successfully' });
  });
});

app.post('/updateRhUser', (req, res) => {
  const { newUsername, newPassword, newName, oldUsername } = req.body;

  const sql = 'UPDATE users SET username = ?, password = ?, name = ? WHERE username = ?';
  const values = [newUsername, newPassword, newName, oldUsername];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error updating user' });
      return;
    }
    res.json({ message: 'User updated successfully' });
  });
});

app.get('/getVerifiedStatus/:username', (req, res) => {
  const { username } = req.params;

  connection.query('SELECT verified FROM users WHERE username = ?', [username], (error, results) => {
    if (error) {
      console.error('Error retrieving user data:', error);
      res.status(500).json({ error: 'Error retrieving user data' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json({ verified: results[0].verified });
      }
    }
  });
});

app.get('/getAllCollab', (req, res) => {
  const sql = "SELECT * FROM users WHERE IsRh = 0 AND IsAdmin = 0"

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }

    res.json({ users: results }); // Send the query results as JSON response
  });
});

app.post('/updateVerifiedStatus', (req, res) => {
  const { username, newVerifiedStatus } = req.body;

  const sql = 'UPDATE users SET verified = ? WHERE username = ?';
  const values = [newVerifiedStatus, username];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error updating verified status' });
      return;
    }
    res.json({ message: 'Verified status updated successfully' });
  });
});

//get all listings endpoint ! 
app.get('/getAllListings', (req, res) => {
  const sql = "SELECT * FROM listings"; // Query updated to retrieve data from the listings table

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }

    res.json({ listings: results }); // Send the query results as JSON response with key 'listings'
  });
});

app.get('/getAllThemes', (req, res) => {
  const sql = "SELECT * FROM schools"; // Query updated to retrieve data from the schools table

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }

    res.json({ schools: results }); // Send the query results as JSON response with key 'schools'
  });
});

