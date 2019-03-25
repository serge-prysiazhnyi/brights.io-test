import React from 'react';

import './button.css'

const Button = ({onClick, text, btnStyle}) => {
    const className = `btn-custom ${btnStyle}`
    return(
        <button onClick={onClick} className={className}>
            {text}
        </button>
    )
}

export default Button;