// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var gradeReportSchema = mongoose.Schema({
  student_number: {
    type: String,
    required: true,
  },
  section_identifier: {
    type: String,
    required: true,
  },
  grade: String,
  create_date: {
    type: Date,
    default: Date.now,
  },
});
// Export Student model
var GradeReport = (module.exports = mongoose.model('gradeReport', gradeReportSchema));
module.exports.get = function (callback, limit) {
  GradeReport.find(callback).limit(limit);
};
