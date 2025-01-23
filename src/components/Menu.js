import React from "react";
import "../App.css"

const menu = ({setlineColor, setlineWidth, setlineOpacity}) => {
    return(
        <div className="menu">
            <label>Bruch Color</label>
            <input type="color" onChange={(e) => {setlineColor(e.target.value);}} />
            <label>Bruch Width</label>
            <input type="range" min={3} max={40} onChange={(e) => {setlineWidth(e.target.value);}} />
            <label>Bruch Opacity</label>
            <input type="range" min={1} max={100} onChange={(e) => {setlineOpacity(e.target.value);}} />
        </div>
        

    )
}

export default menu;