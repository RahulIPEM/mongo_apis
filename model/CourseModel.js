// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var courseSchema = mongoose.Schema({
  course_name: {
    type: String,
    required: true,
  },
  course_number: {
    type: String,
    required: true,
  },
  credit_hours: String,
  department: String,
  create_date: {
    type: Date,
    default: Date.now,
  },
});
// Export Student model
var Course = (module.exports = mongoose.model('course', courseSchema));
module.exports.get = function (callback, limit) {
  Course.find(callback).limit(limit);
};
