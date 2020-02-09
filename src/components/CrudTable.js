import React, { Component } from "react";
import TableComponent from "./TableComponent";

import ProductsService from "../servicios/ProductsService";
import CategoriesService from "../servicios/CategoriesService";

class CrudTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            products: []
        }
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
        this.fetchProducts()
        this.fetchCategories();
    }
    render() {
        return ( 
            <TableComponent data={this.state} />
        )
    }
}

export default CrudTable;