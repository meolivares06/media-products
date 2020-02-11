const api = 'http://localhost:4200';
class CategoriesService {

    constructor() {
        this.categoriesUrl = `${api}/category`;
    }

    async getAll() {
        try {
            const categories = await fetch(this.categoriesUrl);
            return await categories.json();
        } catch (error) {
            console.error(error.message)
        }
    }

    async getProductCategoryById(id) {

        const category = await fetch(this.categoriesUrl + '?id=' + id);


        if (!category) {
            const error = new Error('Category not found');
            throw error;
        }
        return await category.json();


    }

}

export default new CategoriesService();