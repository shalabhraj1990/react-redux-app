import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {
  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }

    // if (authors.length === 0) {
    //   actions.loadAuthors().catch((error) => {
    //     alert("Loading authors failed" + error);
    //   });
    // }
  }
  //  constructor(props) {
  //   super(props);
  // this.state = {
  // state = {
  //   course: {
  //     title: "",
  //     page123: null,
  //   },
  // };
  // this.handleChange = this.handleChange.bind(this);
  // }

  // handleChange = (event) => {
  //   const course = { ...this.state.course, title: event.target.value };
  //   this.setState({ course });
  // };

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   //1st way
  //   // this.props.dispatch(courseActions.createCourse(this.state.course));
  //   //2nd way
  //   //this.props.createCourseD(this.state.course);
  //   //3rd way
  //   this.props.actions.createCourse(this.state.course);
  // };
  render() {
    return (
      <>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}
CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  //actions: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}

function mapDispatchToProps(dispatch) {
  //2nd way
  // return {
  //   createCourseD: (course) => dispatch(courseActions.createCourse(course)),
  // };

  //3rd way
  return {
    actions: bindActionCreators(courseActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
