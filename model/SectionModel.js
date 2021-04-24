// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var sectionSchema = mongoose.Schema({
  section_identifier: {
    type: String,
    required: true,
  },
  course_number: {
    type: String,
    required: true,
  },
  semester: String,
  year: String,
  instructor: String,
  create_date: {
    type: Date,
    default: Date.now,
  },
});
// Export Student model
var Section = (module.exports = mongoose.model('section', sectionSchema));
module.exports.get = function (callback, limit) {
  Section.find(callback).limit(limit);
};
