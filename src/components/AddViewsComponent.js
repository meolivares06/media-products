import React, { useState } from "react";
import ProductsService from "./../servicios/ProductsService";

const AddViewsComponent = ({product})=> {
    const [count, setCount] = useState(product.number_of_views)


    async function incrementNumber() {
        let countT = count+1;
        product.number_of_views = countT;
        const response = await ProductsService.editProduct(product);
        setCount(countT);
    }
    if(!product)
        return ( <span>...</span> )
    return (
        <a
            type="button"
            className="btn btn-sm btn-outline-secondary"
            data-testid="views"
            onClick={()=> incrementNumber()}
        >
            +1<span className="badge badge-dark">{count}</span>
        </a>
    )
}

export default AddViewsComponent;