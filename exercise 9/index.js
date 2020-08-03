import React from 'react';
import ReactDOM from 'react-dom';
import Hello from "./src/Hello";

const rootElement = document.getElementById("root");

ReactDOM.render(<Hello name={"Typescript"}/>, rootElement);