import React, { Component } from "react";
import TableComponent from "./TableComponent";
import Add from "./Add";

import ProductsService from "../servicios/ProductsService";
import CategoriesService from "../servicios/CategoriesService";
import FormProduct from "./FormProduct";

class CrudTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      editing: false,
      productEditing: null
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async fetchProducts() {
    const products = await ProductsService.getAll();
    this.setState({
      products: products
    });
  }
  async fetchCategories() {
    const categories = await CategoriesService.getAll();
    this.setState({
      categories: categories
    });
  }
  async componentDidMount() {
    await this.fetchProducts();
    await this.fetchCategories();
  }
  handleEdit(id) {
    this.setState({
      editing: true
    });
    this.handleSelectProduct(id);
  }
  handleSelectProduct(id) {
    this.setState({
      productEditing: id
    });
  }

  async deleteProduct(id) {
    try {
      const product = await ProductsService.removeProduct(id);
      this.setState({
        products: this.state.products.filter(p => p.id != id)
      });
    } catch (err) {
      console.log(err);
    }
  }
  handleDelete(id) {
    this.deleteProduct(id);
  }
  render() {
    if(this.state.categories.length === 0 || this.state.products == 0){
      return <p>Cargando...</p>;

    }else {
      return (
        <TableComponent
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
          data={this.state}
        />
      );
    }
  }
}

export default CrudTable;

/* Ejemplo con Hooks
 *
 *
 *
 **/
/*import { useState, useEffect } from "react";



async function fetchProducts(setProducts) {
    const products = await ProductsService.getAll();
    setProducts(products);
}
async function fetchCategories(setCategories) {
    const categories = await CategoriesService.getAll();
    setCategories(categories);
}
async function componentDidMount(setCategories, setProducts) {
    fetchProducts(setProducts)
    fetchCategories(setCategories);
}

function CrudTable() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        componentDidMount(setCategories, setProducts);
    })

    let state = {products, categories};
    return (
        <TableComponent data = {  {products, categories} }
        />
    )

}

export default CrudTable;

*/
