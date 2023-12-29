const db = require('../mysql/mysql');

exports.getAllThemes = async () => {
  const query = `SELECT theme_name FROM themes`;
  const themes = await db.query(query);
  return themes;
};

exports.getTopThemes = async () => {
  const query = `SELECT u.theme_name, COUNT(u.username) AS user_count
    FROM users u
    GROUP BY u.theme_name
    HAVING COUNT(u.username) >= (
      SELECT AVG(user_count)
      FROM (
        SELECT COUNT(username) AS user_count
        FROM users
        GROUP BY theme_name
      ) AS counts
    ) 
    ORDER BY user_count DESC`;
  const themes = await db.query(query);
  return themes;
};

exports.createTheme = async (themeName) => {
  try {
    const query = `INSERT INTO themes(theme_name) VALUES("${themeName}")`;
    await db.query(query);
  } catch (e) {
    throw e;
  }
};
