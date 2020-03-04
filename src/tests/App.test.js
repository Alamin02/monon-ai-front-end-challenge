import React from 'react';
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils";
import App from '../components/App';
import { BrowserRouter } from "react-router-dom";

// TODO: Have to add more tests...

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders without crashing", () => {
  act(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
      , container);
  });
})
