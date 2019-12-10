/*
    "Enzyme" need not be in the file name. Jest will find all the files with extensions either .test.js or .jest.js.
    Two ways to render a react component for testing with Enzyme.
    1. Shallow render - renders a single component, 
    Just by itself and is shallow, which means that there is no real dom render and is all virtual.
    Doesn't render the child components.
    Makes it faster than "Mount". 
    2. Mount render - renders the component with all its child components with JSDOM (the actual DOM) in memory.
    Not Shallow. 

    Let's have a handy pattern, which allows us to have a Factory Function on top of react testing,
    that can call our react components with some default values. 
    This can be used outside of Enzyme too in the react test tools.

    console.log(wrapper.debug()) is helpful in cases where the tests fail and we don't understand why the rendition is not aas expected

    Unlike snapshot testing, enzyme doesn't offer a suggestion to update the test according to the changes in the code.

    For example: if "Saving..." is expected while saving is true, and we write the test to expect just "Saving", then snapshot would fail the test,
    and at the same time also suggest a change to the test or offer to update the test by itself in order ot match the code changes.
    Whereas Enzyme, just fails the test and offers no proactive support for updates.

    As of now, I have also observed that the snapshot tests are faster relatively after the first run if no changes needed, as they rely on the previous snapshots to memoize.
    But of course, the trade-of could be that the snapshots would endup occupying more memory then necessary.
    Could be a good idea if we could get rid of each of the successful snapshots after they're run and totally avoid snapshot testing in the production environment.

    But otherwise, Enzyme is pretty handy as it doesn't create any persistent files increasing the load on the server's memory.
*/

import React from "react"; // as we're going to be running react
import CourseForm from "./CourseForm"; // will be our system under test
import { shallow } from "enzyme";

function renderCourseForm(args) {
  const defaultProps = {
    course: {},
    authors: [],
    onSave: () => {}, // default mock function relative to the snapshot's jest.fun()
    onChange: () => {},
    saving: false,
    errors: {}
  };

  // consolidating the input args' values with the default ones. Merging in fact.
  const props = { ...defaultProps, ...args }; // spread operators to the rescue.
  return shallow(<CourseForm {...props} />); // merged props value as input to the shallow renderer
}

it("renders form and header", () => {
  // shallow returns a wrapper
  const wrapper = renderCourseForm(); // not passing any arguments, and relying on the default props.
  //   console.log(wrapper.debug());
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toBe("Add Course");
});

it("labels Save button as Save when not saving.", () => {
  const wrapper = renderCourseForm({ saving: false });
  expect(wrapper.find("button").text()).toBe("Save");
});

it("labels the Save button to Saving when saivng is true.", () => {
  const wrapper = renderCourseForm({ saving: true });
  expect(wrapper.find("button").text()).toBe("Saving...");
});
