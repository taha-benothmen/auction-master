const db = require('../mysql/mysql');

exports.isValidUsername = async (username) => {
  const userQuery =
    'SELECT EXISTS (SELECT 1 FROM users WHERE username = ?) AS userExists';
  const [userRes] = await db.query(userQuery, [username]);
  const isAvailableUser = userRes[0].userExists === 0;
  return isAvailableUser;
};
exports.addNewUser = async (username, password, name) => {
  const theme = 'Voitures';
  const insertUserQuery = 'INSERT INTO users(username, password, name, theme_name) VALUES (?, ?, ?, ?)';
  try {
    await db.query(insertUserQuery, [username, password, name, theme]);
  } catch (error) {
    throw error;
  }
};