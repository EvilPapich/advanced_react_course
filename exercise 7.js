import React from 'react';
import './App.css';
import {action, configure, decorate, observable} from "mobx";
import {observer} from "mobx-react";

configure({enforceActions: "observed"});

class WordStore {
    wordOne = "кетчуп";
    wordTwo = "майонез";
    hybridWord = "";

    setWordOne(value) {
        this.wordOne = value;
    }

    setWordTwo(value) {
        this.wordTwo = value;
    }

    mixWords() {
        this.hybridWord =
            `${this.wordOne.length>3 ? this.wordOne.substring(0, Math.floor(this.wordOne.length/2)) : this.wordOne
            }${this.wordTwo.length>3 ? this.wordTwo.substring(Math.floor(this.wordTwo.length/2)) : this.wordTwo}`;
    }
}
decorate(WordStore, {
    wordOne: observable,
    wordTwo: observable,
    hybridWord: observable,

    setWordOne: action,
    setWordTwo: action,
    mixWords: action,
});

const wordStore = new WordStore();

const InputWordOne = observer(({style}) => {
    console.log("InputWordOne");

    return(
        <input
            type={"text"}
            placeholder={"первое слово"}
            value={wordStore.wordOne}
            onChange={(event) => {
                wordStore.setWordOne(event.target.value);
            }}
            style={style}
        />
    );
});

const InputWordTwo = observer(({style}) => {
    console.log("InputWordTwo");

    return(
        <input
            type={"text"}
            placeholder={"второе слово"}
            value={wordStore.wordTwo}
            onChange={(event) => {
                wordStore.setWordTwo(event.target.value);
            }}
            style={style}
        />
    );
});

const MixWords = observer(({style}) => {
    console.log("MixWords");

    return(
        <input
            type={"button"}
            value={"смешать"}
            onClick={() => {
                wordStore.mixWords();
            }}
            style={style}
        />
    );
});

const HybridWord = observer(({style}) => {
    console.log("HybridWord");

    return(
        <input
            type={"input"}
            placeholder={"новое слово"}
            value={wordStore.hybridWord}
            onChange={()=>{}}
            style={style}
        />
    );
});

function withStyle(WrappedComponent, style) {
    return class extends React.Component {
        render() {
            return (
                <WrappedComponent style={style} {...this.props}/>
            );
        }
    }
}

const styleForInputs = {
    border: "1px solid #444",
    borderRadius: "5px",
    marginBottom: "20px"
};

const InputWordOneWithStyle = withStyle(InputWordOne, styleForInputs);
const InputWordTwoWithStyle = withStyle(InputWordTwo, styleForInputs);
const MixWordsWithStyle = withStyle(MixWords, styleForInputs);
const HybridWordWithStyle = withStyle(HybridWord, styleForInputs);

class App extends React.Component {
    render() {
        return (
            <div className="App"
                 style={{display: "flex",flexDirection: "column",flex: 1,width: "50%",margin: "0 auto",padding: "10%"}}
            >
                <div style={{display: "flex",flexDirection: "row",flex: 1,justifyContent: "space-between"}}
                >
                    <InputWordOneWithStyle/>
                    {"+"}
                    <InputWordTwoWithStyle/>
                </div>
                <div>
                    <MixWordsWithStyle/>
                </div>
                <div>
                    <HybridWordWithStyle/>
                </div>
            </div>
        );
    }
}

export default App;