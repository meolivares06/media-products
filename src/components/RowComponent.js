import React, { useEffect, useState } from "react";
import AddViewsComponent from "./AddViewsComponent";
import Edit from "./Edit";
import GetAbbreviation from "./GetAbbreviation";
import GetLengthFormated from "./GetLengthFormated";
import CategoriesService from "../servicios/CategoriesService";

class RowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: null
    };
  }



  async componentDidMount() {
    try {
      const response = await CategoriesService.getProductCategoryById(
        this.props.product.category_id
      );
      this.setState({
        categoryName: response[0].name
      });
    }catch(error) {
      console.log(error);

    }

  }
  delete(id) {
    this.props.onDelete(id)
  }
  render() {
    const { product, category, onEdit } = this.props;
    if (!this.state.categoryName) {
      return (<p>Cargando....</p>)
    }else {
      return (
        <tr>
          <th scope="row">{this.state.categoryName}</th>
          <td>{product.name}</td>
          <td>{product.abbreviation}</td>
          <td>{product.type}</td>
          <td>{GetLengthFormated(product.length)}</td>
          <td>{product.release_date}</td>
          <td>{product.insert_date}</td>
          <td>
            <AddViewsComponent product={product} />
          </td>
          <td>
            <div className="btn-group">
              <Edit productId={product.id} onEdit={onEdit} />
              <a
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => {
                  this.delete(product.id);
                }}
              >
                Delete
              </a>
            </div>
          </td>
        </tr>
      );
    }
  }
}
/*const RowComponent = ({product,category, onEdit}) => {
    console.log(1, product,category, onEdit);


    const [categoryName, setCategoryName] = useState('');


      useEffect(() => {
        async function fetchData() {
          // You can await here
          const response =  await CategoriesService.getProductCategoryById(category);
          setCategoryName(response[0].name);
        }
        fetchData();

      });


    return (
        <tr>
            <th scope="row">{categoryName}</th>
            <td>{product.name}</td>
            <td><GetAbbreviation value={product.abbreviation} /></td>
            <td>{product.type}</td>
            <td>{product.release_date}</td>
            <td>{product.insert_date}</td>
            <td><AddViewsComponent /></td>
            <td>
                <div className="btn-group">
                    <Edit productId={product.id} onEdit={onEdit} />
                    <a type="button" className="btn btn-sm btn-outline-secondary">Delete</a>

                </div>
            </td>
        </tr>
    )
}*/

export default RowComponent;
