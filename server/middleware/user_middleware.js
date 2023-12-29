const bcrypt = require('bcrypt');
const db = require('../mysql/mysql');
const registration_middleware = require('../middleware/registration_middleware');

exports.get_user_info = async (username) => {
  try {
    const result = await db.query(
      'SELECT theme_name, description, IsAdmin FROM users WHERE username = ?',
      [username]
    );
    return result[0][0];
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

exports.update_user_info = async (
  old_username,
  new_username,
  new_password,
  new_description
) => {
  try {
    if (new_password && new_password.length > 0) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(new_password, salt);
      await db.query('UPDATE users SET password = ? WHERE username = ?', [
        hashedPassword,
        old_username,
      ]);
    }

    if (new_description !== undefined) {
      await db.query('UPDATE users SET description = ? WHERE username = ?', [
        new_description,
        old_username,
      ]);
    }

    if (
      new_username !== undefined &&
      new_username.length > 0 &&
      new_username !== old_username
    ) {
      const isValidUsername = await registration_middleware.isValidUsername(
        new_username
      );
      if (isValidUsername) {
        await db.query('UPDATE users SET username = ? WHERE username = ?', [
          new_username,
          old_username,
        ]);
      }
    }
  } catch (error) {
    console.error('Error updating user info:', error);
    throw error;
  }

  return new_username || old_username;
};

exports.delete_user = async (username) => {
  try {
    await db.query('DELETE FROM users WHERE username = ?', [username]);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
