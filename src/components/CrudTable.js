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
      productEditing: null,
      sort_field: 'number_of_views',
      sort_order: 'asc'
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.onIncrementNumber = this.onIncrementNumber.bind(this);

  }

  async fetchProducts(sort_fieldP, sort_orderP) {
    let sort_field = sort_fieldP || this.state.sort_field;
    let sort_order = sort_orderP || this.state.sort_order;
    const products = await ProductsService.getAll(sort_field, sort_order);
    this.setState({
      products: products,
      sort_field: sort_field,
      sort_order: sort_order
    });
  }
  async fetchCategories() {
    try{
      const categories = await CategoriesService.getAll();
      this.setState({
        categories: categories
      });
    } catch (err) {
      console.log(err);
    }
  }
  async componentDidMount() {
    try{
      await this.fetchProducts();
      await this.fetchCategories();
    } catch (err) {
      console.log(err);
    }
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

  async handleSort(field, order='desc') {
    try{
      await this.fetchProducts(field, order);
    } catch (err) {
      console.log(err);
    }
  }
  async onIncrementNumber(product, number_of_views) {
    try {
      product.number_of_views = parseInt(number_of_views) + 1;
      const response = await ProductsService.editProduct(product);
      await this.fetchProducts();
    }catch(error) {
      console.log(error);

    }
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
          onSort={this.handleSort}
          onIncrementNumber={this.onIncrementNumber}
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
