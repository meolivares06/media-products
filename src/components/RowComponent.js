import React from "react";
import AddViewsComponent from "./AddViewsComponent";
const RowComponent = ({product,category}) => {
    return (
        <tr>
            <th scope="row">{category}</th>
            <td>{product.name}</td>
            <td>{product.abbreviation}</td>
            <td>{product.type}</td>
            <td>{product.release_date}</td>
            <td>{product.insert_date}</td>
            <td>
                <div className="btn-group">
                    <a type="button" className="btn btn-sm btn-outline-secondary">Edit</a>
                    <a type="button" className="btn btn-sm btn-outline-secondary">Delete</a>
                    <AddViewsComponent />
                </div>
            </td>
        </tr>
    )
}

export default RowComponent;