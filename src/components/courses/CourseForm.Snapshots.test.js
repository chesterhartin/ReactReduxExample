import React from "react";
import CourseForm from "./CourseForm";
import renderer from "react-test-renderer";
import { courses, authors } from "../../../tools/mockData";
import { isTSAnyKeyword, exportAllDeclaration } from "@babel/types";
import { JestEnvironment } from "@jest/environment";
/*
    Renderer returns a tree which is an object that represents the output of a react component. 
    Snapshots are written under the same directory as the test with "__" in the fromt and back of the snapshot to avoid any confusions: "__snapshots__"
    Boolean variables: Their existence itself is inferred to be true by default in tests. Therefore we don't have to specify explicitly "saving = true" as below
    Now when we run the test using any of the npm commands, it creates a __snapshots__ file in the same directory as of this test. Let's run it..
*/

it("sets submit button label to 'Saving...' when saving is true", () => {
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving
    />
  );

  expect(tree).toMatchSnapshot();
});

it("sets submit button label to 'Save' when saving is false", () => {
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving={false}
    />
  );

  expect(tree).toMatchSnapshot();
});
