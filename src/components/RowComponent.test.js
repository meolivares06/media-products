import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import RowComponent from './RowComponent';


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

it("renderiza RowComponent con datos o sin datos", ()=> {
  act(() => {
    render(<RowComponent />, container);
  })
  expect(container.textContent).toBe("")

  act(() => {
    const fakeProduct = {
      "category_id": 4,
      "name": "Spiderman2",
      "type": "Video",
      "release_date": "08/02/2020",
      "insert_date": "08/02/2020",
      "number_of_views": 0,
      "abbreviation": "SPI"
    }
    render(<RowComponent  product={fakeProduct} category={fakeProduct.id} />, container);
  })
  expect(container.textContent).toBe("Spiderman2SPIVideo08/02/202008/02/2020+10EditDelete")
})