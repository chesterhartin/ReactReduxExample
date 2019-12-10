import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import * as authorActions from "../../redux/actions/authorActions";
import { Redirect } from "react-router-dom";
import Spinner from "../common/spinner";
import { toast } from "react-toastify";

// PropTypes help us specify the props that our component accepts

// need a few lifecycle methods and states. Therefore we need it to be a class or we can also use functions and use react hooks.
class CoursesPage extends React.Component {
  // this is a class field, opposed to that seen below which is a state field. Easier. Better for lazier people like us.
  state = {
    redirectToAddCoursePage: false
  };

  // we can load the courses on app load or on courses component load. Former is a better choice as the latter loads when not necessary yet certainly.
  componentDidMount() {
    const { courses, authors, actions } = this.props; // destructuring this.props
    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }
  // therefore getting rid of the constructor and hence the super(props) call
  // constructor(props) {
  // super(props);

  // converting state to a class field like handleChange
  // this.state = {
  // state = {
  //   course: {
  //     title: ""
  //   }
  // };

  // Let's handle edits and adds on a different component. Get rid of the state and the form tags

  // approach 2: Constructor binding. This is better than the first approach as it binds the function just once and doesn't create function on every render
  // this.handleChange = this.handleChange.bind(this);
  // }

  // handleChange = event => {
  //   // the arrow functions inherit the binding context of their enclosing scope. Basically arrow functions don't have a this binding and
  //   // hence, a "this" within the function would reference the class instance
  //   // also known as "class field" syntax and should be available in the javascript around summer 2020. But we can use this as of today since Babel helps us on this.
  //   // approach 3: better than the other two.
  //   const course = { ...this.state.course, title: event.target.value }; // over write the state's course.
  //   // this.setState({ course: course });
  //   this.setState({ course }); // simplified as the course's type matched that of course
  // };

  // handleSubmit = event => {
  //   event.preventDefault();
  //   // this.props.dispatch(courseActions.createCourse(this.state.course)); // now it says that the dispatch is missing in the props validation. Therefore add it.
  //   // createCourse becomes available on the props after declaring the mapDispatchToProps
  //   this.props.actions.createCourse(this.state.course); // now we can switch to the dispatcher we have created below in the mapDispatchToProps
  //   // this dispatch is the one that's automatically injected into the component as we omitted the mapDispatchToProps by the connect function that we have called below
  // };

  handleDeleteCourse = async course => {
    toast.success("Course deleted");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    /*
    return (
      // having submti event tied to the form tag rather than the submit button makes the submit event get triggered on an Enter Keypress too which wouldn't bethe case otherwise.
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          //  approach 1
          // onChange={this.handleChange.bind(this)} // if we don't bind it in here, then the "this" in the event handler would not be the right context we need.
          // note for this on line 102 below
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <input type="submit" value="Save" />
        {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
        // when ever we iterate over a array, react expects a key that's unique 
      </form>
      But bind within a render method is not ideal as it results in the creation of a new function on every render unnecessarily
      */
    //);

    return (
      /*
        what's happening here is that, when a user clicks on the ass course button below, the onlick event is tied to set the state's rediretToAddCoursePage boolean to true.
        And this triggers a change in the state of the component which inturn triggers a re-render of the component and this time when the condition below is checked and the 
        left hand side of the logical AND operator evaluates to true and hence the right hand side of the expression <Redirect takes effect and gets executed.
      */
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
            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </>
        )}
      </>
    );
  }
}

function mapStateToProps(
  state
  // ,ownProps
) {
  /*
    Be as specific as you can at this point while you decide on the amoutn of the state's data you want to expose to this component.
    If you expose the whole state, then the component gets re-rendered every time there's any change in the whole of the state, which could most of the times be irrelevant.
    Rather, to take advantage of the virtual DOM of react, being more specific makes the re-render of the component tied only to that part of the state's data change.

    ownProps: It's the component's own props that get passed into this component. And since it is unused, we can comment it out or omit it for now
  */
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            // notice that we use mutation proof functions like map/filter that don't change the input obkect but create a new object
            return {
              ...course,
              authorName: state.authors.find(
                author => author.id === course.authorId
              ).name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  // receives dispatch as the sole argument.
  // the actions we declare here will be available in the component on props
  // approach 1: manual mapping done here out of the 4 ways to do it.
  // return {
  //   createCourseActionDispatcher: course =>
  //   this.props.dispatch(courseActions.createCourse(this.state.course));
  // };
  // approach 2
  // return {
  //   createCourseActionDispatcher: course =>
  //     dispatch(courseActions.createCourse(course))
  // }; // nothing happens if we didn't wrap this in dispatch. Disaptch has to call the action as it is th eone that notifies redux of the action.

  // approach 3 to bind actions in dispatcher calls using redux's bindActionCreators
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
    // bindActionCreators returns all of the actions wrapped in dispatcher functions. It can also take individual actions as input
    // makes it more terse when we have many actions and avoids duplication of code or promotes healthy re-useablility.
  };
}

/* But we shall stick to the bindActionCreators' approach as it saves us a lot of time and maintanence when we have a number of actions on a component. 
  // approach 4: declaring mapDispatchToProps as an object instead of as a function
  const mapDispatchToProps = {
    // inside here you can declare each action as a property for the object.
    createCourse: courseActions.createCourse
    //  What happens when we declare mapDispatch as an object, each of its properties must be an action creator function as we have above.
    //  And each of these action creator functions are picked up by the Connect below and are wrapped inside a dispatch function.
  };
*/

// prop types declarations
CoursesPage.propTypes = {
  // remember that the propTypes on this line has to have a lower cased "p" to begin with.
  // after bindActionsCreator, we don't have to be specific aboput the action but, rather have actions declared int he prop types as an object
  actions: PropTypes.object.isRequired,
  // createCourseActionDispatcher: PropTypes.func.isRequired,
  // also the dispatch is no longer injected into the component by redux, and only the actions we specify in the mapDispatchToProps will be available.
  // dispatch: PropTypes.func.isRequired, // can be commented out as we don't need it anymore after the mapDispatchToProps() function's declaration
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

// const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps);
// export default connectedStateAndProps(CoursesPage);
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
// mapDispatchToProps is optional and lets us decide what actions we would like to have exposed on our component
// on omission, our component gets a Dispatch() added to our props automatically, which can be used to dispatch actions individually.
