// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
  res.json({
    status: 'API Its Working',
    message: 'Welcome to RESTHub crafted with love!',
  });
});

// Import contact controller
var contactController = require('../controller/ContactController');
// Contact routes
router.route('/contacts').get(contactController.index).post(contactController.new);
router
  .route('/contacts/:contact_id')
  .get(contactController.view)
  .patch(contactController.update)
  .put(contactController.update)
  .delete(contactController.delete);

// Import student controller
var studentController = require('../controller/StudentController');
router.route('/students').get(studentController.index).post(studentController.new);
router
  .route('/students/:contact_id')
  .get(studentController.view)
  .patch(studentController.update)
  .put(studentController.update)
  .delete(studentController.delete);

// Import course controller
var courseController = require('../controller/CourseController');
router.route('/courses').get(courseController.index).post(courseController.new);
router
  .route('/courses/:course_id')
  .get(courseController.view)
  .patch(courseController.update)
  .put(courseController.update)
  .delete(courseController.delete);

// Import section controller
var sectionController = require('../controller/SectionController');
router.route('/sections').get(sectionController.index).post(sectionController.new);
router
  .route('/sections/:section_id')
  .get(sectionController.view)
  .patch(sectionController.update)
  .put(sectionController.update)
  .delete(sectionController.delete);

// Import grade report controller
var gradeReportController = require('../controller/GradeReportController');
router.route('/grade/reports').get(gradeReportController.index).post(gradeReportController.new);
router
  .route('/grade/reports/:gradeReportId')
  .get(gradeReportController.view)
  .patch(gradeReportController.update)
  .put(gradeReportController.update)
  .delete(gradeReportController.delete);

// Import section controller
var prerequisiteController = require('../controller/PrerequisiteController');
router.route('/prerequisites').get(prerequisiteController.index).post(prerequisiteController.new);
router
  .route('/prerequisites/:prerequisite_id')
  .get(prerequisiteController.view)
  .patch(prerequisiteController.update)
  .put(prerequisiteController.update)
  .delete(prerequisiteController.delete);

var utilityController = require('../controller/UtilityController');
router.route('/fetch/user/course/grade').post(utilityController.fetchCourseGrade);
router.route('/fetch/student/course/grade').post(utilityController.fetchStudentCourseGrade);
router.route('/fetch/prerequisite/course').post(utilityController.fetchPrerequisiteCourse);

// Export API routes
module.exports = router;
