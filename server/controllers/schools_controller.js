const schools_middleware = require('../middleware/schools_middleware');

exports.getAllSchools = async (req, res) => {
  try {
    const schools = await schools_middleware.getAllSchools(req);
    if (!schools[0]) {
      res.status(400).json({ message: 'No schools available' });
    }
    res.status(200).json(schools[0]);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

exports.getTopSchools = async (req, res) => {
  try {
    const schools = await schools_middleware.getTopSchools();
    if (!schools[0]) {
      res.status(400).json({ message: 'No schools available' });
    }
    res.status(200).json(schools[0]);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

exports.createSchools = async (req, res) => {
  try {
    const { schoolName } = req.body;
    await schools_middleware.createSchool(schoolName).then((newSchool) => {
      if (newSchool == undefined) {
        res.status(401).json({ message: 'School not created at schools contoller', school: req });
      } else {
        res.status(201).json({ message: 'School created successfully', school: req });
      }
    });

  } catch (e) {
    res.status(500).json({ message: e });
  }

};
