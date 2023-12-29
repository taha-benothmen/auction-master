const themes_middleware = require('../middleware/themes_middleware');

exports.getAllThemes = async (req, res) => {
  try {
    const themes = await themes_middleware.getAllThemes(req).then((res) => {
      if (!themes[0]) {
        res.status(400).json({ message: 'No themes available' });
      }
      res.status(200).json(themes[0]);
    })
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

exports.getTopThemes = async (req, res) => {
  try {
    const themes = await themes_middleware.getTopThemes();
    if (!themes[0]) {
      res.status(400).json({ message: 'No themes available' });
    }
    res.status(200).json(themes[0]);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

exports.createThemes = async (req, res) => {
  try {
    const { themeName } = req.body;
    await themes_middleware.createTheme(themeName).then((newTheme) => {
      if (newTheme == undefined) {
        res.status(401).json({ message: 'Theme not created at themes contoller', theme: req });
      } else {
        res.status(201).json({ message: 'Theme created successfully', theme: req });
      }
    });

  } catch (e) {
    res.status(500).json({ message: e });
  }

};
