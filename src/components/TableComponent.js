import React from "react";
import RowComponent from "./RowComponent";


const getCategory = (arr, id) => {
    return arr.find(category => category.id ==id);
}
const getProductRows = (products=[], categories=[]) => {
     
    return products.map((product, index) => {
        const {name} = getCategory(categories, product.category_id);   
        return (<RowComponent key={index} product={product} category={name} />);
    });
}
const TableComponent = ({data}) => {
    try {
        const {products, categories} = data;
        return (
            <table className="table  table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Name</th>
                        <th scope="col">Abbr</th>
                        <th scope="col">Type</th>
                        <th scope="col">R.Date</th>
                        <th scope="col">I.Date</th>
                        <th scope="col">Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {getProductRows(products, categories)}
                   
                </tbody>
            </table>
        )
    }catch(error) {
        return (
            <table className="table  table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Name</th>
                        <th scope="col">Abbr</th>
                        <th scope="col">Type</th>
                        <th scope="col">R.Date</th>
                        <th scope="col">I.Date</th>
                        <th scope="col">Operations</th>
                    </tr>
                </thead>
                
            </table>
        )
    }
    
    
    
}

export default TableComponent;