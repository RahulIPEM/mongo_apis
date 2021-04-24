// contactController.js
// Import contact model
const Prerequisite = require('../model/PrerequisiteModel');
// Handle index actions
exports.index = function (req, res) {
  Prerequisite.get(function (err, prerequisites) {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      });
    }
    res.json({
      status: 'success',
      message: 'Prerequisites retrieved successfully',
      data: prerequisites,
    });
  });
};
// Handle create contact actions
exports.new = function (req, res) {
  var prerequisite = new Prerequisite();
  prerequisite.course_number = req.body.course_number ? req.body.course_number : prerequisite.course_number;
  prerequisite.prerequisite_number = req.body.prerequisite_number;
  // save the contact and check for errors
  prerequisite.save(function (err) {
    // if (err)
    //     res.json(err);
    res.json({
      message: 'New prerequisite created!',
      data: prerequisite,
    });
  });
};
// Handle view contact info
exports.view = function (req, res) {
  Prerequisite.findById(req.params.prerequisite_id, function (err, prerequisite) {
    if (err) res.send(err);
    res.json({
      message: 'Prerequsite details loading..',
      data: prerequisite,
    });
  });
};
// Handle update contact info
exports.update = function (req, res) {
  Prerequisite.findById(req.params.prerequisite_id, function (err, prerequisite) {
    if (err) res.send(err);
    prerequisite.course_number = req.body.course_number ? req.body.course_number : prerequisite.course_number;
    prerequisite.prerequisite_number = req.body.prerequisite_number;
    // save the contact and check for errors
    prerequisite.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: 'Prerequisite Info updated',
        data: prerequisite,
      });
    });
  });
};
// Handle delete contact
exports.delete = function (req, res) {
  Prerequisite.remove(
    {
      _id: req.params.prerequisite_id,
    },
    function (err, prerequisite) {
      if (err) res.send(err);
      res.json({
        status: 'success',
        message: 'Prerequisite deleted',
      });
    }
  );
};
