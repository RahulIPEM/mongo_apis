const Student = require('../model/StudentModel');
const GradeReport = require('../model/GradeReportModel');
const Section = require('../model/SectionModel');
const Course = require('../model/CourseModel');
const Prerequisite = require('../model/PrerequisiteModel');

/**
 * Fetch student course and grade data
 * @param {*} req
 * @param {*} res
 */
exports.fetchCourseGrade = async (req, res) => {
  try {
    let result = {};

    // Fetching Student documents
    const student = await Student.findOne({ name: req.body.student_name }).setOptions({ lean: true }).exec();
    result.student = student;

    // Fetching GradeReport documents
    const gradeReports = await GradeReport.find({ student_number: student.student_number }).setOptions({ lean: true }).exec();

    const courseList = [];
    // Fetching Section documents by using gradeReport
    for (let gradeReport of gradeReports) {
      const section = await fetchSections(gradeReport.section_identifier);
      const course = await fetchCourses(section.course_number);
      courseList.push({ ...course, grade_report: gradeReport });
    }
    result['courses'] = courseList;

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'failed' });
  }
};

/**
 * Fetch student, course and grade data by Course
 * @param {*} req
 * @param {*} res
 */
exports.fetchStudentCourseGrade = async (req, res) => {
  try {
    let result = {};
    const { course_name, semester, year } = req.body;

    const course = await Course.findOne({ course_name }).setOptions({ lean: true }).exec();
    // result['course'] = course;

    const sections = await Section.find({ course_number: course.course_number, semester, year }).setOptions({ lean: true }).exec();
    // result['sections'] = sections;

    const gradeReportList = [];
    for (let section of sections) {
      gradeReportList.push(await fetchGradeReports(section.section_identifier));
    }
    result['grade_reports'] = gradeReportList;

    const studentList = [];
    for (let gradeReport of gradeReportList) {
      studentList.push(await fetchStudents(gradeReport.student_number));
    }
    result['students'] = studentList;

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'failed' });
  }
};

/**
 * This method fetch course data by using prerequisite
 * @param {*} req
 * @param {*} res
 */
exports.fetchPrerequisiteCourse = async (req, res) => {
  try {
    let result = {};
    const { course_name } = req.body;

    const course = await Course.findOne({ course_name }).setOptions({ lean: true }).exec();
    // result['course'] = course;

    const prerequisites = await Prerequisite.find({ course_number: course.course_number }).setOptions({ lean: true }).exec();

    const courseList = [];
    for (let prerequisite of prerequisites) {
      courseList.push(await fetchCourseByCourseNumber(prerequisite.prerequisite_number));
    }
    result['course'] = courseList;

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 'failed' });
  }
};

/**
 * This method fetches section
 * @param {*} section_identifier
 * @returns returns a section object
 */
const fetchSections = async section_identifier => {
  return await Section.findOne({ section_identifier: section_identifier }).setOptions({ lean: true }).exec();
};

/**
 * This method fetches course
 * @param {*} course_number
 * @returns returns a course json object
 */
const fetchCourses = async course_number => {
  return await Course.findOne({ course_number: course_number }).setOptions({ lean: true }).exec();
};

/**
 * This method is used to fetch GradeReport
 * @param {*} section_identifier
 * @returns
 */
const fetchGradeReports = async section_identifier => {
  return await GradeReport.findOne({ section_identifier }).setOptions({ lean: true }).exec();
};

/**
 * This method is used to find student
 * @param {*} student_number : student unique identifier from Student document.
 * @returns Student json object
 */
const fetchStudents = async student_number => {
  return await Student.findOne({ student_number }).setOptions({ lean: true }).exec();
};

/**
 * This method is used to fetch courses
 * @param {*} course_number
 * @returns
 */
const fetchCourseByCourseNumber = async course_number => {
  return await Course.findOne({ course_number }).setOptions({ lean: true }).exec();
};
