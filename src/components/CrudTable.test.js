import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import CrudTable from './CrudTable';


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

it("renderiza CrudTable con datos", async () => {
    const fakeProducts = [{
            "category_id": 4,
            "name": "Spiderman2",
            "type": "Video",
            "release_date": "08/02/2020",
            "insert_date": "08/02/2020",
            "number_of_views": 0,
            "abbreviation": "SPI"
        },
        {
            "category_id": 4,
            "name": "Spiderman the invisible men",
            "type": "Video",
            "release_date": "08/02/2020",
            "insert_date": "08/02/2020",
            "number_of_views": 0,
            "abbreviation": "STIM"
        }
    ]

    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeProducts)
        })
    );
    

    // Necesito categorias tambien
    const fakeCategories = [
      {
          "id": 1,
          "name": "Trailer TV",
          "hasLenght": "30"
      },
      {
          "id": 2,
          "name": "Radio Spot",
          "hasLenght": "20"
      },
      {
          "id": 3,
          "name": "Outdoors",
          "hasLenght": "30"
      },
      {
          "id": 4,
          "name": "Trailer Movie",
          "hasLenght": "30"
      },
      {
          "id": 5,
          "name": "Internet",
          "hasLenght": "0"
      }
    ];
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(fakeCategories)
        })
    );
    
    await act(async () => {
        render( <CrudTable /> , container);
    })
    console.log(111,container.textContent);
    expect(container.textContent).toBe('CategoryNameAbbrTypeR.DateI.DateOperations')

    global.fetch.mockRestore();
})