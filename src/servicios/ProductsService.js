import GetAbbreviation from "../components/GetAbbreviation";
import GetLengthFormated from "../components/GetLengthFormated";

const api = "http://localhost:4200";

class ProductsService {
  constructor() {
    this.productsUrl = `${api}/product`;
  }

  async getAll(sort_field, sort_order) {
    let url = this.productsUrl;

    if(undefined !== sort_field)
      url = `${url}?_sort=${sort_field}`

    if (undefined !== sort_order)
      url = `${url}&_order=${sort_order}`

    try {
      const products = await fetch(url);
      return await products.json();
    } catch (error) {
      console.error(error.message);
    }
  }

  async sort(field) {
    try {
      //http://localhost:4200/product?_sort=number_of_views
      let url = `${this.productsUrl}?_sort=${field}`;
      const products = await fetch(url);
      return await products.json();
    } catch (error) {
      console.error(error.message);
    }
  }

  async getProductById(id) {
    const product = await fetch(this.productsUrl + "?id=" + id);

    if (!product) {
      const error = new Error("Product not found");
      throw error;
    }
    return await product.json();
  }

  async addProduct(product) {
    
    const payload = this.adaptResponse(product);
    try {
      const responseNew = await fetch(this.productsUrl, {
        method: "POST", // using the POST method
        mode: "cors",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const json = await responseNew.json();

      return json;
    } catch (err) {
      console.log("Error creating product:", err);
    }
  }

  /**
   * Adaptador para transformar la respuesta al formato de la base de datos Json
   * @param {Respuesta que llega desde la peticion http} response
   */
  adaptResponse(response) {
    const t = {
      id: response.id || response.productId || null,
      category_id: response.category_id || response.productCategory,
      name: response.name || response.productName,
      type: response.type || response.productType,
      release_date: response.release_date || response.productReleaseDate,
      insert_date: response.insert_date || response.productInsertDate,
      number_of_views: response.number_of_views || response.productViews,
      abbreviation:
        response.productAbbreviation || response.productAbbreviation,
      length: response.length || response.productLength
    };

    const abbr = response.abbreviation || response.productAbbreviation;

    if (abbr === "") {
      t.abbreviation = GetAbbreviation(t.name);
    } else {
      t.abbreviation = abbr;
    }

    /*
    const length = response.length || response.productLength;
    if (length !== null) {
      t.length = GetLengthFormated(length);
    }*/
    return t;
  }

  async editProduct(product) {

    const payload = this.adaptResponse(product);
    try {
      const responseNew = await fetch(`${this.productsUrl}/${payload.id}`, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const json = await responseNew.json();

      return json;
    } catch (err) {
      console.log("Error updating product:", err);
    }
  }

  async removeProduct(product_id) {
    try {
      const responseNew = await fetch(this.productsUrl + `/${product_id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const json = await responseNew.json();

      return json;
    } catch (err) {
      console.log("Error updating product:", err);
    }
  }
}

export default new ProductsService();
