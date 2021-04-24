// contactController.js
// Import contact model
const Course = require('../model/CourseModel');
// Handle index actions
exports.index = function (req, res) {
  Course.get(function (err, courses) {
    if (err) {
      res.json({
        status: 'error',
        message: err,
      });
    }
    res.json({
      status: 'success',
      message: 'Courses retrieved successfully',
      data: courses,
    });
  });
};
// Handle create contact actions
exports.new = function (req, res) {
  var course = new Course();
  course.course_name = req.body.course_name ? req.body.course_name : course.course_name;
  course.course_number = req.body.course_number;
  course.credit_hours = req.body.credit_hours;
  course.department = req.body.department;
  // save the contact and check for errors
  course.save(function (err) {
    // if (err)
    //     res.json(err);
    res.json({
      message: 'New course created!',
      data: course,
    });
  });
};
// Handle view contact info
exports.view = function (req, res) {
  Course.findById(req.params.course_id, function (err, course) {
    if (err) res.send(err);
    res.json({
      message: 'Course details loading..',
      data: course,
    });
  });
};
// Handle update contact info
exports.update = function (req, res) {
  Course.findById(req.params.course_id, function (err, course) {
    if (err) res.send(err);
    course.course_name = req.body.course_name ? req.body.course_name : course.course_name;
    course.course_number = req.body.course_number;
    course.credit_hours = req.body.credit_hours;
    course.department = req.body.department;
    // save the contact and check for errors
    course.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: 'Course Info updated',
        data: course,
      });
    });
  });
};
// Handle delete contact
exports.delete = function (req, res) {
  Course.remove(
    {
      _id: req.params.course_id,
    },
    function (err, course) {
      if (err) res.send(err);
      res.json({
        status: 'success',
        message: 'Course deleted',
      });
    }
  );
};
