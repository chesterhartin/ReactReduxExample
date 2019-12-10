import React from "react";
import { mount } from "enzyme";
import { authors, courses, newCourse } from "../../../tools/mockData";
import { ManageCoursePage } from "./ManageCoursePage";
// import { Provider } from "react-redux";

// factory function to talk to react components with default values
/*
    Contianer component testing: Testing mostly non-mark up parts of the application which verify the behavioral aspects of the component.
    Note that we have to apss in all the props that include the ones that would be otherwise supllied by redux as well.

    Notice that we are using mount instead of shallow which is only a single layer deep and in our case here,
    we need to test the interaction of the current component "ManaCoursePage" with its child component.
    For instance, the "title" which sits in the CourseForm component depends on the props supplied by the ManageCoursePage component.
    Therefore in cases like these, we might have to use container testing tools like mount instead of a shallow.
*/
function render(args) {
  const defaultProps = {
    authors,
    courses,
    // Passed from React Router in real app, so just stubbing in for test.
    // Could also use MemoryRouter as shown in the Header.test.js
    // or even wrap with React Router, depending on whether
    // I need to test the React Router related behavior.
    history: {},
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    course: newCourse,
    match: {}
  };

  const props = { ...defaultProps, ...args };
  // return mount(<ManageCoursePage {...props} />);
  // method 1: To wrap our component within a <Provider/> component
  return mount(
    // <Provider>
    <ManageCoursePage {...props} />
    // </Provider>
  );
}

it("sets error when attempting to save an empty title field", () => {
  const wrapper = render(); // render the form
  wrapper.find("form").simulate("submit"); // find the form element and simulate a submit button click action
  const error = wrapper.find(".alert").first(); // find the first of many errors that have a CSS class .alert
  expect(error.text()).toBe("Title is required");
});

// Hitting save and running the test at this point in time would give us a long scary looking error.
/*  
    console.error node_modules/jsdom/lib/jsdom/virtual-console.js:29
    Error: Uncaught [Invariant Violation: Could not find "store" in the context of "Connect(ManageCoursePage)". 
    Either wrap the root component in a <Provider>, 
    or pass a custom React context provider to <Provider> and
    the corresponding React context consumer to Connect(ManageCoursePage) in connect options.
    
    Problem: We don't have a store to use. As a container component does nto export the component we wrote but, 
    is wrapped within a call to connect() method.

    2 ways to solve the problem.
    1. - Wrap the react component within a <Provide><ManageCoursePage/></Provider>
        This ensures that we provide a redux store to the component.
    2. Create and supply a custom react contect provider to the Provider Component and the React context consumer to the connect(ManageCoursePage) method.
*/
// the error is very helpful in fact, after scrolling all the way on to the top of the error log
