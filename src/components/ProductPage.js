import React from "react";
import { useParams } from "react-router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProductsService from "./../servicios/ProductsService";
import CategoriesService from "./../servicios/CategoriesService";

class ProductPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //form: {
      productId: null,
      productCategory: "",
      productName: "",
      productType: "",
      productReleaseDate: "",
      productInsertDate: "",
      productViews: "",
      productAbbreviation: "",
      //},
      categories: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  adaptResponse(response) {
    //falta id
    const t = {
      productId: response.id || response.productId || null,
      productCategory: response.category_id || response.productCategory,
      productName: response.name || response.productName,
      productType: response.type || response.productType,
      productReleaseDate: response.release_date || response.productReleaseDate,
      productInsertDate: response.insert_date || response.productInsertDate,
      productViews: response.number_of_views || response.productViews,
      productAbbreviation: response.abbreviation || response.productAbbreviation
    };
    return t;
  }
  async componentDidMount() {
    try {
      const response = await CategoriesService.getAll();
      this.setState({
        categories: response
      });

      if(this.props.editing === 1) {
        const responsep = await ProductsService.getProductById(1);
        const t = responsep[0];
        this.setState({
          productId: t.id,
          productCategory: t.category_id,
          productName: t.name,
          productType: t.type,
          productReleaseDate: t.release_date,
          productInsertDate: t.insert_date,
          productViews: t.number_of_views,
          productAbbreviation: t.abbreviation
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    
  }
  handleSubmit(event) {
    const formData = this.adaptResponse(this.state);
    if(this.props.editing === 1)
      ProductsService.editProduct(formData);
    else
      ProductsService.addProduct(formData);
    event.preventDefault();
  }

  render() {
    if (
      this.state.categories.length === 0 ||
      (this.props.editing === 1 && this.state.productCategory == "")
    ) {
      return <p>Cargando...</p>;
    } else {
      return (
        <FormProductPage
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
          p={this.state}
          editing={this.props.editing}
        />
      );
    }
  }
}

const FormProductPage = props => {
  const { handleSubmit, handleInputChange, p } = props;
  const c = p.categories;

  return (
    <form method="post" onSubmit={() => handleSubmit(p)}>
      <div className="form-group">
        <label htmlFor="productCategory">Category</label>
        <select
          className="form-control"
          id="productCategory"
          name="productCategory"
          onChange={handleInputChange}
          value={p.productCategory}
        >
          {c.map(category => {
            return [<option value="">---</option>,<option value={category.id}>{category.name}</option>];
          })}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="productName">Product name</label>
        <input
          type="text"
          className="form-control"
          id="productName"
          aria-describedby="nameHelp"
          placeholder="Enter name of product"
          value={p.productName}
          onChange={handleInputChange}
          name="productName"
        />
      </div>
      <div className="form-group">
        <label htmlFor="productType">Product type</label>
        <input
          type="text"
          className="form-control"
          id="productType"
          aria-describedby="typeHelp"
          placeholder="Enter type of product"
          onChange={handleInputChange}
          name="productType"
          value={p.productType}
        />
      </div>

      <div className="form-group">
        <label htmlFor="productReleaseDate">Release Date</label>
        <input
          type="date"
          className="form-control"
          id="productReleaseDate"
          aria-describedby="typeHelp"
          placeholder="Enter type of product"
          onChange={handleInputChange}
          name="productReleaseDate"
          value={p.productReleaseDate}
        />
      </div>

      <div className="form-group">
        <label htmlFor="productInsertDate">Insert date</label>
        <input
          type="date"
          className="form-control"
          id="productInsertDate"
          aria-describedby="typeHelp"
          placeholder="Enter type of product"
          onChange={handleInputChange}
          name="productInsertDate"
          value={p.productInsertDate}
        />
      </div>

      <div className="form-group">
        <label htmlFor="productViews">Number of views</label>
        <input
          type="text"
          className="form-control"
          id="productViews"
          aria-describedby="viewsHelp"
          placeholder="Enter type of product"
          onChange={handleInputChange}
          name="productViews"
          value={p.productViews}
        />
      </div>

      <div className="form-group">
        <label htmlFor="productType">Product abbreviation</label>
        <input
          type="text"
          className="form-control"
          id="productAbbreviation"
          aria-describedby="typeHelp"
          placeholder="Enter type of product"
          name="productAbbreviation"
          onChange={handleInputChange}
          value={p.productAbbreviation}
        />
        <small id="typeHelp" className="form-text text-muted">
          The Abbreviation will be in base of the product name, The Abbreviation
          will has at least 3 characters. Ex: - Spiderman: SPI. - New Things:
          NET. - Five Feed Apart: FFA. - Spiderman the invisible men: STIM.
        </small>
      </div>

      <button onClick={handleSubmit} type="button" className="btn btn-primary">
        Submit
      </button>

      <Link className="btn btn-secondary my-2" to="/list">
        List products
      </Link>
    </form>
  );
};

export default ProductPage;
