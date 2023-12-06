const db = require('../mysql/mysql');

exports.getAllSchools = async () => {
  const query = `SELECT * FROM schools`;
  const schools = await db.query(query);
  return schools;
};

exports.getTopSchools = async () => {
  const query = `SELECT u.school_name, COUNT(u.username) AS user_count
    FROM users u
    GROUP BY u.school_name
    HAVING COUNT(u.username) >= (
      SELECT AVG(user_count)
      FROM (
        SELECT COUNT(username) AS user_count
        FROM users
        GROUP BY school_name
      ) AS counts
    ) 
    ORDER BY user_count DESC`;
  const schools = await db.query(query);
  return schools;
};

exports.createSchool = async (schoolName) => {
  try {
    const query = `INSERT INTO schools(school_name) VALUES("${schoolName}")`;
    await db.query(query);
  } catch (e) {
    throw e;
  }
};
