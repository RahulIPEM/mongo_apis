// contactController.js
// Import contact model
const GradeReport = require('../model/GradeReportModel');
// Handle index actions
exports.index = function (req, res) {
  GradeReport.get(function (err, gradeReport) {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      });
    }
    res.json({
      status: 'success',
      message: 'Grade reports retrieved successfully',
      data: gradeReport,
    });
  });
};
// Handle create contact actions
exports.new = function (req, res) {
  var gradeReport = new GradeReport();
  gradeReport.student_number = req.body.student_number ? req.body.student_number : gradeReport.student_number;
  gradeReport.section_identifier = req.body.section_identifier;
  gradeReport.grade = req.body.grade;
  // save the contact and check for errors
  gradeReport.save(function (err) {
    // if (err)
    //     res.json(err);
    res.json({
      message: 'New grade report created!',
      data: gradeReport,
    });
  });
};
// Handle view contact info
exports.view = function (req, res) {
  GradeReport.findById(req.params.gradeReportId, function (err, gradeReport) {
    if (err) res.send(err);
    res.json({
      message: 'Grade reports details loading..',
      data: gradeReport,
    });
  });
};
// Handle update contact info
exports.update = function (req, res) {
  GradeReport.findById(req.params.gradeReportId, function (err, gradeReport) {
    if (err) res.send(err);
    gradeReport.student_number = req.body.student_number ? req.body.student_number : gradeReport.student_number;
    gradeReport.section_identifier = req.body.section_identifier;
    gradeReport.grade = req.body.grade;
    // save the contact and check for errors
    gradeReport.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: 'Grade Report Info updated',
        data: gradeReport,
      });
    });
  });
};
// Handle delete contact
exports.delete = function (req, res) {
  GradeReport.remove(
    {
      _id: req.params.gradeReportId,
    },
    function (err, gradeReport) {
      if (err) res.send(err);
      res.json({
        status: 'success',
        message: 'Grade Report deleted',
      });
    }
  );
};
