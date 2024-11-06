import * as React from "react";

const CustomImage = (props) => {
    return (
    <div>
        <img src = {props.source} className={props.className} style={props.style} width={props.width} height={props.height} alt="img" />
    </div>
    )
}

export default CustomImage;