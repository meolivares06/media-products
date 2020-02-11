import React from "react";
import RowComponent from "./RowComponent";


const getCategory = (arr, id) => {
    return arr.find(category => category.id ==id);
}
const getProductRows = (products=[], categories=[], onEdit, onDelete) => {

    return products.map((product, index) => {
        //const {name, id} = getCategory(categories, product.category_id);
        return (
          <RowComponent
            key={index}
            product={product}
            category={product.category_id}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
    });
}
const TableComponent = ({data, onEdit, onDelete}) => {


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
                <th scope="col">Length</th>
                <th scope="col">R.Date</th>
                <th scope="col">I.Date</th>
                <th scope="col">Views</th>
                <th scope="col">Operations</th>
              </tr>
            </thead>
            <tbody>{getProductRows(products, categories, onEdit, onDelete)}</tbody>
          </table>
        );
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