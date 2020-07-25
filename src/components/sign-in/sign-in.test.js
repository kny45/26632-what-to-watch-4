import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx";

describe(`Render SignIn`, () => {
  it(`SignIn is rendered correctly`, () => {
    const tree = renderer.create(
        <SignIn />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});