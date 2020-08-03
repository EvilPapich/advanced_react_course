import React from 'react';
import ReactDOM from 'react-dom';

const Hello = () => <h1>Hello, Webpack!!!</h1>;

const rootElement = document.getElementById("root");

ReactDOM.render(<Hello/>, rootElement);