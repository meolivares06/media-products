const api = 'http://localhost:4200';
class CategoriesService {

    constructor() {
        this.categoriesUrl = `${api}/categories`;
    }

    async getAll() {
        try {
            const categories = await fetch(this.categoriesUrl);
            return await categories.json();
        } catch (error) {
            console.error(error.message)
        }
    }

}

export default new CategoriesService();