import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import { useParams } from "react-router";
import ProductsService from "../servicios/ProductsService";
import CategoriesService from "../servicios/CategoriesService";

class FormProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productCategory: props.productCategory ? props.productCategory : "",
      productName: props.productName ? props.productName : "",
      productType: props.productType ? props.productType : "",
      productReleaseDate: props.productReleaseDate   ? props.productReleaseDate   : "",
      productInsertDate: props.productInsertDate ? props.productInsertDate : "",
      productViews: props.productViews ? props.productViews : "",
      productAbbreviation: props.productAbbreviation     ? props.productAbbreviation     : "",
      categories: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
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
      let payload = {
        productCategory: this.state.productCategory ? this.state.productCategory  : "",
        productName: this.state.productName ? this.state.productName : "",
        productType: this.state.productType ? this.state.productType : "",
        productReleaseDate: this.state.productReleaseDate ? this.state.productReleaseDate : "",
        productInsertDate: this.state.productInsertDate ? this.state.productInsertDate  : "",
        productViews: this.state.productViews ? this.state.productViews : "",
        productAbbreviation: this.state.productAbbreviation ? this.state.productAbbreviation : ""
      };
    if (this.props.editing) {
        ProductsService.editProduct(payload);
    }
    else {
        let { id } = useParams();
        ProductsService.addProduct(payload);
    }
    event.preventDefault();
  }

  async fetchCategories() {
    const categories = await CategoriesService.getAll();
    this.setState({
      categories: categories
    });

  }
  async componentDidMount() {
    await this.fetchCategories();

  }

  getList() {
    this.state.categories.map(category => {
      return <option value="category.id">category.Name</option>;
    });
  }

  async temp() {
      let { id } = useParams();
    if(undefined !== id) {
        let { id } = useParams();
        const product = await ProductsService.getProductById(id);
        this.setState({
          productCategory: product.productCategory,
          productName: product.productName,
          productType: product.productName,
          productReleaseDate: product.productReleaseDate,
          productInsertDate: product.productInsertDate,
          productViews: product.productViews,
          productAbbreviation: product.productAbbreviation
        });
    }
  }
  render() {
    this.temp();
    return (
      <form method="post" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="productCategory">Category</label>
          <select
            className="form-control"
            id="productCategory"
            name="productCategory"
            onChange={this.handleInputChange}
          >
            {this.state.categories.map(category => {
              return <option value={category.id}>{category.name}</option>;
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
            value={this.state.productName}
            onChange={this.handleInputChange}
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
            onChange={this.handleInputChange}
            name="productType"
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
            onChange={this.handleInputChange}
            name="productReleaseDate"
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
            onChange={this.handleInputChange}
            name="productInsertDate"
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
            onChange={this.handleInputChange}
            name="productViews"
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
          />
          <small id="typeHelp" className="form-text text-muted">
            The Abbreviation will be in base of the product name, The
            Abbreviation will has at least 3 characters. Ex: - Spiderman: SPI. -
            New Things: NET. - Five Feed Apart: FFA. - Spiderman the invisible
            men: STIM.
          </small>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>

        <Link className="btn btn-secondary my-2" to="/list">
          List products
        </Link>
      </form>
    );
  }
}

export default FormProduct;
