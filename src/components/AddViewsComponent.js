import React, { useState } from "react";

const AddViewsComponent = ()=> {
    const [count, setCount] = useState(0)
    return (
        <a 
            type="button" 
            className="btn btn-sm btn-outline-secondary"
            data-testid="views"
            onClick={()=> setCount(count + 1)}
        >
            +1<span className="badge badge-dark">{count}</span>
        </a>                            
    )
}

export default AddViewsComponent;