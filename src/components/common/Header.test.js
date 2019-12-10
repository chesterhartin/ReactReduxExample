/*
    Summary:
    Shallow: Fast and light weight. Test one compoennt in isolation.
    Mount: More realistic. Render component and its children.

    Use Mount if you want to test the final DOM, or use refs or test if you want to test the interactions with the child components.
*/

import React from "react"; // to render react components
import { shallow, mount } from "enzyme"; // to use both shallow and mount to watch the difference
import Header from "./Header"; // systme under test
import { MemoryRouter } from "react-router-dom"; // cuz the Header component expects to be run as a child of the React-Router and for the props from React-Router component to be injected/pased into the Header COmponent.

// Note how with shallow render, we can search for the react component tag "NavLink"
it("contains 3 nav links via shallow", () => {
  const numLinks = shallow(<Header />).find("NavLink").length;
  expect(numLinks).toEqual(3);
});

// Note with mount, how we search for the final rendered html since it generates the final html DOM.
// We also need to pull in the React Router's MemoryRouter since the Header expects to have the React Router's props to be passed in.
it("contains 3 nav links via mount", () => {
  const anchors = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find("a");
  console.log(anchors.debug());
  const numAnchors = anchors.length;
  expect(numAnchors).toEqual(3);
});
