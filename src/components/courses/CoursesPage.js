import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class CoursesPage extends React.Component {
  //  constructor(props) {
  //   super(props);
  // this.state = {
  state = {
    course: {
      title: "",
      page123: null,
    },
  };
  // this.handleChange = this.handleChange.bind(this);
  // }

  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    //1st way
    // this.props.dispatch(courseActions.createCourse(this.state.course));
    //2nd way
    //this.props.createCourseD(this.state.course);
    //3rd way
    this.props.actions.createCourse(this.state.course);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        ></input>
        <input type="submit" value="Save"></input>
        {this.props.courses &&
          this.props.courses.map((course) => (
            <div key={course.title}>{course.title}</div>
          ))}
      </form>
    );
  }
}
CoursesPage.propTypes = {
  //createCourseD: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
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
