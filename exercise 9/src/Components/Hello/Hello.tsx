import React from 'react';
import './style.scss';

const Hello = ({name}: {name: string}) => {
    return (
        <h1>Hello, <span class={"name"}>{name}</span>!!!</h1>
    );
};

export default Hello;