import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/spinner";
import { toast } from "react-toastify";

// converting the class component to hooks based functional component
export function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props // this is the rest operator that can be used to destructure the properties that haven't been destructured yet.
}) {
  // NOTE: We are not using the redux state here to store the course information because, it is not required elsewhere or globally but, is only needed here in this component.
  // our form will need a local state to hold the values that are entered before being submitted. Therefore, we set up a local state using the useState hook of react below.w
  const [course, setCourse] = useState({ ...props.course }); // course is our state variable and setCourse is our setter for the state variable.
  // useState(default value for the state) expects default value for the state and we use the props.course as the initial value of our state.
  const [errors, setErrors] = useState({}); // errors: a state variable is initialized to an empty object, which makes sense as we don't have any errors to start with.
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch(error => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse({ ...props.course }); // if we have any courses available, then tie it back to the local state's course
    }

    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.course]); // this second argument is supplied as an array of items, and if there's any change in this array of items this useEffect (which essentially means that we're using the effect of the change, and hence the name) will re-run
  // passing an empty array means that it will run this chunk of code just once, which is effectively the same as the componentOnMount() function we used earlier in the class component.

  function handleChange(event) {
    const { name, value } = event.target;
    // we're using the functional form of setState instead of padding an object, so that we can safely set the new state that's based on the existing state.
    setCourse(prevCourse => ({
      // basically a functional call gives us the access to the previous state, which can be helpful in situations where we need to compare
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
    // [name] is javascript's computed property syntax. It allows us to reference a property via a variable.
  }

  function handleSave(event) {
    event.preventDefault();
    if (!isFormValid()) return;
    setSaving(true); // no need to set it back to false as we navigate to a different page on save
    saveCourse(course)
      .then(() => {
        toast.success("Coarse Saved.");
        // this time let's use the react router's history to redirect to a previous page after save.
        history.push("/courses"); // basically acts as a stack datastructure LIFO and navigates to courses.
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  function isFormValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required";
    if (!authorId) errors.author = "AuthorId is required";
    if (!category) errors.category = "Category is required";
    setErrors(errors);
    // Form is valid if the errors object has no properties
    return Object.keys(errors).length === 0;
  }

  // mandatory: if you are trying to render any markup; this is the place to do so.
  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
      <CourseForm
        course={course}
        errors={errors}
        authors={authors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    );
}

//     useEffect(() {
//     if (courses.length === 0) {
//       loadCourses().catch(error => {
//         alert("Loading courses failed" + error);
//       });
//     }

//     if (authors.length === 0) {
//       loadAuthors().catch(error => {
//         alert("Loading authors failed" + error);
//       });
//     }
//     )

//   render() {
//     return (
//       <>
//         <h2>Manage Course</h2>
//       </>
//     );
//   }
// }

// functions like this are called selectors as they select data from the redux store. And can be placed in the course reducers to be called by other components
export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

// telling what parts of the state are made accessible on props
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    courses: state.courses,
    authors: state.authors,
    course // object shortcut syntax
  };
}

// let's use the object form of the mapDispatchToProps that can simplify our function's structure
// function mapDispatchToProps(dispatch) {
//   return {
//     actions: {
//       loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
//       loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
//     }
//   };
// }

// declare an object instead of a function
// const mapDispatchToProps = {
//   loadCourses: courseActions.loadCourses,
//   loadAuthors: authorActions.loadAuthors
// };

// javascript object shorthand syntax
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse
};

ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired, // is a thunk. Therefore a function type
  loadAuthors: PropTypes.func.isRequired, // is a thunk. Therefore a function type
  course: PropTypes.object.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);

// notice how we don't have our this key words litered all over the component
