import React from "react";
import RowComponent from "./RowComponent";

const getCategory = (arr, id) => {
  return arr.find(category => category.id === id);
};
const getProductRows = (
  products = [],
  categories = [],
  onEdit,
  onDelete,
  onIncrementNumber
) => {
  return products.map((product, index) => {
    let category = categories.find(category => parseInt(category.id) === parseInt(product.category_id));
    console.log(category);

    return (
      <RowComponent
        key={`product${product.id}`}
        product={product}
        category={category}
        onEdit={onEdit}
        onDelete={onDelete}
        onIncrementNumber={onIncrementNumber}
      />
    );
  });
};
const TableComponent = ({
  data,
  onEdit,
  onDelete,
  onSort,
  onIncrementNumber
}) => {
  try {
    const { products, categories } = data;
    let sort_order = "desc";
    if (data.sort_order === "desc") sort_order = "asc";

    return (
      <table className="table  table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Name</th>
            <th scope="col">Abbr</th>
            <th scope="col">Type</th>
            <th scope="col">Length</th>
            <th scope="col"><button
              onClick={() => {
                onSort("release_date", sort_order);
              }}
              className="btn btn-link btn-sm"
            >
              R.Date <small>{sort_order}</small>
            </button></th>
            <th scope="col">I.Date</th>
            <th scope="col">
              <button
                onClick={() => {
                  onSort("number_of_views", sort_order);
                }}
                className="btn btn-link btn-sm"
              >
                Views <small>{sort_order}</small>
              </button>
            </th>
            <th scope="col">Operations</th>
          </tr>
        </thead>
        <tbody>
          {getProductRows(
            products,
            categories,
            onEdit,
            onDelete,
            onIncrementNumber
          )}
        </tbody>
      </table>
    );
  } catch (error) {
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
    );
  }
};

export default TableComponent;
