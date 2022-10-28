import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };
  componentDidMount() {
    const { courses, authors, actions } = this.props;

    if (courses.length === 0) {
      actions.courses.loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      actions.authors.loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
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
  handleDeleteCourse = async (course) => {
    toast.success("Course deleted");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
          </>
        )}
        <CourseList
          onDeleteClick={this.handleDeleteCourse}
          courses={this.props.courses}
        />
        )
      </>
    );
  }
}
CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};
function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  //2nd way
  // return {
  //   createCourseD: (course) => dispatch(courseActions.createCourse(course)),
  // };

  //3rd way
  return {
    actions: {
      courses: bindActionCreators(courseActions, dispatch),
      authors: bindActionCreators(authorActions, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
