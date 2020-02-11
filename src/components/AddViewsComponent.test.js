import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import AddViewsComponent from './AddViewsComponent';


let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("Renderizado inicial", ()=> {
    act(()=>{
        render(<AddViewsComponent />, container);
    })
    expect(container.textContent).toBe('+10');
})

it("Aumenta el valor con click", ()=> {

    act(()=>{
        render(<AddViewsComponent />, container);
    });

    const a = document.querySelector("[data-testid=views]");
    expect(a.textContent).toBe('+10');

    act(()=>{
        a.dispatchEvent(new MouseEvent("click", {bubbles: true}))
    });
    expect(container.textContent).toBe('+11');
})