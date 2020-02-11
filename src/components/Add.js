import React, { useState } from "react";
import FormProduct from "./FormProduct";

const AddForm = (props) => {
    return (
        <div>
            <FormProduct />
            <a type="button" 
                className="btn btn-sm btn-outline-secondary"
                onClick={props.onClick}>Back</a>
        </div>
    )
}

const ButtonAdd = (props) => {
    return (
        <a type="button" 
            className="btn btn-sm btn-outline-secondary"
            onClick={props.onClick}>Add</a>
    )
}
const Add = (props)=> {
    const [showAddForm, setShowAddForm] = useState(false);
    const handleClick = (event)=> {
        setShowAddForm(!showAddForm)
        console.log(showAddForm);
        
    }
    console.log(showAddForm);
    return (
        <AddForm onClick={()=> setShowAddForm(!showAddForm)}/> 
    )
    
}

export default Add;