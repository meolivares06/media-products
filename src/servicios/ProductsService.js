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
      const error = new Error("Book not found");
      throw error;
    }
    return await product.json();
  }

  async addProduct(product) {debugger;
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

      return json.success;
    } catch (err) {
      console.log("Error creating product:", err);
    }
  }

  adaptResponse(response) {
    //falta id
    const t = {
      id: response.productId || null,
      category_id: response.productCategory,
      name: response.productName,
      type: response.productType,
      release_date: response.productReleaseDate,
      insert_date: response.productInsertDate,
      number_of_views: response.productViews,
      abbreviation: response.productAbbreviation,
      length: response.productLength
    };
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

      return json.success;
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

      return json.success;
    } catch (err) {
      console.log("Error updating product:", err);
    }
  }
}

export default new ProductsService();
