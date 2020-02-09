import ProductsService from './ProductsService';

describe("ProductsService", () => {
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
    it('Get products data', async() => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fakeProducts)
            })
        );
        const products = await ProductsService.getAll();
        expect(products).toBe(fakeProducts);
        global.fetch.mockRestore();
    })
})