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
const themesRouter = require('./routes/themes');
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
app.use('/themes', themesRouter);
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
  database: 'enchere_app-db'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

app.post('/addThemeEndpoint', (req, res) => {
  const { themeName } = req.body;

  const sql = 'INSERT INTO themes(theme_name) VALUES(?)';
  const values = themeName;

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

  const sql = 'UPDATE themes SET theme_name = ? WHERE theme_name = ?';
  const sql1 = 'UPDATE listings SET theme = ? WHERE theme = ?';

  const values = [newTheme, oldTheme];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error executing theme update query:', err);
      res.status(500).json({ error: 'Error updating theme' });
      return;
    }

    connection.query(sql1, values, (err1, results1) => {
      if (err1) {
        console.error('Error executing listings update query:', err1);
        res.status(500).json({ error: 'Error updating listings' });
        return;
      }

      res.json({ message: 'Theme and listings updated successfully' });
    });
  });
});


app.post('/updateCommonts', (req, res) => {
  const { newComment, oldComentID } = req.body;

  const sql = 'UPDATE comments SET content = ? WHERE cid = ?';
  const values = [newComment, oldComentID];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error updating comment' });
      return;
    }
    res.json({ message: 'Comment updated successfully' });
  });
});




app.delete('/deletetheme', (req, res) => {
  const { themeName } = req.body;

  const sql = `DELETE FROM themes WHERE theme_name = ?`;
  const values = [themeName];

  connection.query(sql, [themeName], (err, results) => {
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
app.get('/checkThemeUsage', (req, res) => {
  const { themeName } = req.query;

  const checkThemeQuery = `SELECT COUNT(*) AS themeCount FROM listings WHERE theme = ?`;

  connection.query(checkThemeQuery, [themeName], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error checking theme usage' });
      return;
    }

    const themeCount = results[0].themeCount;

    // Send a response indicating if the theme is used in listings
    res.json({ usedInListings: themeCount > 0 });
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
  const { listingId, newPrice, winer } = req.body;

  const sql = 'UPDATE listings SET price = ?, winer = ? WHERE lid = ?'; // Changed 'AND' to ','
  const values = [newPrice, winer, listingId];

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

app.get('/themes', (req, res) => {
  const sql = `SELECT theme_name FROM themes`;
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }
    res.json(results);
  });
});
app.get('/themesCount', (req, res) => {
  const sql = `SELECT themes.theme_name, COUNT(listings.lid) AS num_listings
  FROM themes
  LEFT JOIN listings ON themes.theme_name = listings.theme
  GROUP BY themes.theme_name;
  `;
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error getting themes count' });
      return;
    }
    res.json(results);
  });
});

app.get('/getAllUsers', (req, res) => {
  const sql = "SELECT * FROM users "

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }

    res.json({ users: results }); // Send the query results as JSON response
  });
});
app.get('/listingCount', (req, res) => {
  const sql = "SELECT * FROM listings "

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error executing query' });
      return;
    }

    res.json({ listings: results }); // Send the query results as JSON response
  });
});