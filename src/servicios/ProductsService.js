const api = 'http://localhost:4200';
class ProductsService {

    constructor() {
        this.productsUrl = `${api}/products`;
    }

    async getAll() {
        try {
            const products = await fetch(this.productsUrl);
            return await products.json();
        } catch (error) {
            console.error(error.message)
        }
    }

}

export default new ProductsService();