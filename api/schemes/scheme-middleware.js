const Schemes = require('./scheme-model');


/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async(req, res, next) => {
  try {
    const { scheme_id } = req.params;
    const scheme = await Schemes.findById(scheme_id);
    if (scheme) {
      req.scheme = scheme;
      next();
    } else {
      res.status(404).json({ message: "Scheme not found" });
    }
  } catch (err) {
    next(err);
  }


}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;
  if (scheme_name) {
    next();
  } else {
    res.status(400).json({ message: "invalid step" });
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body;
  if (instructions && typeof step_number === 'number') {
    next();
  } else {
    res.status(400).json({ message: "Invalid step data" });
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
