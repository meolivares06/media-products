import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import GetAbbreviation from './GetAbbreviation';


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

it("renderiza GetAbbreviation sin datos", ()=> {
  act(() => {
    render(<GetAbbreviation />, container);
  })
  expect(container.textContent).toBe('')
})
it("renderiza SPI para Spiderman", ()=> {
    act(() => {
      let value = 'Spiderman';  
      render(<GetAbbreviation value={value}/>, container);
    })
    expect(container.textContent).toBe('SPI')
})
it("renderiza New Things: NET.", ()=> {
    act(() => {
      let value = 'New Things';  
      render(<GetAbbreviation value={value}/>, container);
    })
    expect(container.textContent).toBe('NET')
})
it("renderiza Five Feed Apart: FFA.", ()=> {
    act(() => {
      let value = 'Five Feed Apart';  
      render(<GetAbbreviation value={value}/>, container);
    })
    expect(container.textContent).toBe('FFA')
})
it("renderiza Spiderman the invisible men: STIM.", ()=> {
    act(() => {
      let value = 'Spiderman the invisible men';  
      render(<GetAbbreviation value={value}/>, container);
    })
    expect(container.textContent).toBe('STIM')
})