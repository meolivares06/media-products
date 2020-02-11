import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const Edit = (props)=> {
    const handleClick = (event)=> {
        console.log(props);
        props.onEdit(props.productId);
    }
    const url = `/edit/${props.productId}`;
    return (
        <Link to={url}
            className="btn btn-sm btn-outline-secondary"
            onClick={handleClick}>Edit
        </Link>
    )
}

export default Edit;