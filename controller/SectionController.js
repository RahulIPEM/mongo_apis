// contactController.js
// Import contact model
const Section = require('../model/SectionModel');
// Handle index actions
exports.index = function (req, res) {
  Section.get(function (err, sections) {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      });
    }
    res.json({
      status: 'success',
      message: 'Sections retrieved successfully',
      data: sections,
    });
  });
};
// Handle create contact actions
exports.new = function (req, res) {
  var section = new Section();
  section.section_identifier = req.body.section_identifier ? req.body.section_identifier : section.section_identifier;
  section.course_number = req.body.course_number;
  section.semester = req.body.semester;
  section.year = req.body.year;
  section.instructor = req.body.instructor;
  // save the contact and check for errors
  section.save(function (err) {
    // if (err)
    //     res.json(err);
    res.json({
      message: 'New section created!',
      data: section,
    });
  });
};
// Handle view contact info
exports.view = function (req, res) {
  Section.findById(req.params.section_id, function (err, section) {
    if (err) res.send(err);
    res.json({
      message: 'Section details loading..',
      data: section,
    });
  });
};
// Handle update contact info
exports.update = function (req, res) {
  Section.findById(req.params.section_id, function (err, section) {
    if (err) res.send(err);
    section.section_identifier = req.body.section_identifier ? req.body.section_identifier : section.section_identifier;
    section.course_number = req.body.course_number;
    section.semester = req.body.semester;
    section.year = req.body.year;
    section.instructor = req.body.instructor;
    // save the contact and check for errors
    section.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: 'Section Info updated',
        data: section,
      });
    });
  });
};
// Handle delete contact
exports.delete = function (req, res) {
  Section.remove(
    {
      _id: req.params.section_id,
    },
    function (err, section) {
      if (err) res.send(err);
      res.json({
        status: 'success',
        message: 'Section deleted',
      });
    }
  );
};
