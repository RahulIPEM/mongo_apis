// contactModel.js
var mongoose = require('mongoose');
// Setup schema
var prerequisiteSchema = mongoose.Schema({
  course_number: {
    type: String,
    required: true,
  },
  prerequisite_number: String,
  create_date: {
    type: Date,
    default: Date.now,
  },
});
// Export Student model
var Prerequisite = (module.exports = mongoose.model('prerequisite', prerequisiteSchema));
module.exports.get = function (callback, limit) {
  Prerequisite.find(callback).limit(limit);
};
