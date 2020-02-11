import GetAbbreviation from "../components/GetAbbreviation";
import GetLengthFormated from "../components/GetLengthFormated";

const api = "http://localhost:4200";

class ProductsService {
  constructor() {
    this.productsUrl = `${api}/product`;
  }

  async getAll() {
    try {
      const products = await fetch(this.productsUrl);
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
    debugger;
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
      abbreviation: response.productAbbreviation || response.productAbbreviation,
      length: response.length || response.productLength
    };

    const abbr = response.abbreviation || response.productAbbreviation;

    if (abbr === "") {
      t.abbreviation = GetAbbreviation(t.productName);
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
    debugger;
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
