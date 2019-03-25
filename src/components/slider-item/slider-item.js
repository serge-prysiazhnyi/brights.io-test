import React from 'react';

import './slider-item.css'

const SliderItem = ({path}) => {
    return(
        <div className="slider-item">
            <img className="slider-item-img" src={path} alt="happy face" />
        </div>
    )
}

export default SliderItem;