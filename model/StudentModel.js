// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  student_number: {
    type: String,
    required: true,
  },
  class: String,
  major: String,
  create_date: {
    type: Date,
    default: Date.now,
  },
});
// Export Student model
var Student = (module.exports = mongoose.model('student', studentSchema));
module.exports.get = function (callback, limit) {
  Student.find(callback).limit(limit);
};
