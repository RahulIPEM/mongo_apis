// contactController.js
// Import contact model
const Student = require('../model/StudentModel');
// Handle index actions
exports.index = function (req, res) {
  Student.get(function (err, students) {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      });
    }
    res.json({
      status: 'success',
      message: 'Students retrieved successfully',
      data: students,
    });
  });
};
// Handle create contact actions
exports.new = function (req, res) {
  var student = new Student();
  student.name = req.body.name ? req.body.name : student.name;
  student.student_number = req.body.student_number;
  student.class = req.body.class;
  student.major = req.body.major;
  // save the contact and check for errors
  student.save(function (err) {
    // if (err)
    //     res.json(err);
    res.json({
      message: 'New student created!',
      data: student,
    });
  });
};
// Handle view contact info
exports.view = function (req, res) {
  Student.findById(req.params.student_id, function (err, student) {
    if (err) res.send(err);
    res.json({
      message: 'Student details loading..',
      data: student,
    });
  });
};
// Handle update contact info
exports.update = function (req, res) {
  Student.findById(req.params.student_id, function (err, student) {
    if (err) res.send(err);
    student.name = req.body.name ? req.body.name : student.name;
    student.student_number = req.body.student_number;
    student.class = req.body.class;
    student.major = req.body.major;
    // save the contact and check for errors
    student.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: 'Student Info updated',
        data: student,
      });
    });
  });
};
// Handle delete contact
exports.delete = function (req, res) {
  Student.remove(
    {
      _id: req.params.student_id,
    },
    function (err, student) {
      if (err) res.send(err);
      res.json({
        status: 'success',
        message: 'Student deleted',
      });
    }
  );
};
