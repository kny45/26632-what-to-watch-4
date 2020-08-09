import * as React from "react";
import {Router} from "react-router-dom";
import * as renderer from "react-test-renderer";
import SignIn from "./sign-in";

import history from "../../history";

describe(`Render SignIn`, () => {
  it(`SignIn is rendered correctly`, () => {
    const tree = renderer
      .create(
          <Router history = {history}>
            <SignIn
              authorizationError = {false}
              onSubmit = {() => {}}
            />
          </Router>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
