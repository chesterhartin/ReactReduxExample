import React from "react"; // to render using react.
import { cleanup, render } from "react-testing-library"; // offers cleanup that should be run after completion of each test. Of course render to render the component.
import CourseForm from "./CourseForm"; // system under test

// can also centralise this configuration. Let's keep it simple here.
afterEach(cleanup); // to wire up our clean up fucntion to run after each test

function renderCourseForm(args) {
  const defaultProps = {
    course: {},
    authors: [],
    onSave: () => {},
    onChange: () => {},
    saving: false,
    errors: {}
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}
// components are always rendered completely as a DOM in memory
it("should render Add Course header", () => {
  // render() from line 20 above returns a bunch of functions that can be called upon. Let's use getByText()
  // getByText() jsut scans throught he entire DOM and finds a match. No need to explicitly mention expect() or any assertion statements.
  // Querying itself is an assertion implicitly.
  const { getByText } = renderCourseForm(); // destructuring to a method that we'd like to use
  getByText("Add Course");
});

it("should label save button as 'Saving...' when saving is true'", () => {
  const { getByText } = renderCourseForm({ saving: true });
  getByText("Saving...");
});

it("should label the save button to Save whne not saving", () => {
  const { getByText, debug } = renderCourseForm({ saving: false });
  debug(); // debug is one of the functions output to our disposal, which outputs a colored render of html DOM
  getByText("Save");
});
