import React, { useState } from "react";
import ProductsService from "./../servicios/ProductsService";

const AddViewsComponent = ({
  product,
  number_of_views,
  onIncrementNumber
}) => {
  console.log(number_of_views);

  function incrementNumber(product, number_of_views) {
    onIncrementNumber(product, number_of_views);
  }
  if (!product) return <span>...</span>;
  return (
    <a
      type="button"
      className="btn btn-sm btn-outline-secondary"
      data-testid="views"
      onClick={() => incrementNumber(product, number_of_views)}
    >
      +1<span className="badge badge-dark">{number_of_views}</span>
    </a>
  );
};

class AddViewsComponent2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      number_of_views: props.number_of_views,
      product: props.product
    };

    this.incrementNumber = this.incrementNumber.bind(this);
  }

  async incrementNumber() {
    try {
      let changed = this.state.product;
      changed.number_of_views = parseInt(changed.number_of_views) + 1;
      const response = await ProductsService.editProduct(changed);
      this.setState({
        number_of_views: response.number_of_views,
        product: response
      });
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    console.log("did mount");

    this.setState({
      number_of_views: this.props.number_of_views,
      product: this.props.product
    });
  }
  render() {
      console.log('render', this.state.number_of_views, this.props.number_of_views, this.state.product.name, '-', this.props.product.name);
    return (
      <a
        type="button"
        className="btn btn-sm btn-outline-secondary"
        data-testid="views"
        onClick={this.incrementNumber}
      >
        +1<span className="badge badge-dark">{this.state.number_of_views}</span>
      </a>
    );
  }
}
export default AddViewsComponent;
