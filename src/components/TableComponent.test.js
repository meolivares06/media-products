import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import TableComponent from './TableComponent';


let container  = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renderiza TableComponent con datos o sin datos", ()=> {
  act(() => {
    render(<TableComponent />, container);
  })
  expect(container.textContent).toBe('CategoryNameAbbrTypeR.DateI.DateOperations')
})