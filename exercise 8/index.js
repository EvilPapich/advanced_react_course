import React from 'react';
import {action, computed, configure, decorate, observable} from "mobx";
import {inject, observer, Provider} from "mobx-react";

configure({enforceActions: "observed"});

class WordStore {
    wordOne = "кетчуп";
    wordTwo = "майонез";
    //hybridWord = "";
    get hybridWord() {
        return this.mixWords(this.wordOne, this.wordTwo);
    }

    setWordOne(value) {
        this.wordOne = value;
    }

    setWordTwo(value) {
        this.wordTwo = value;
    }

    mixWords = (wordOne, wordTwo) => {
      return `${wordOne.length>3 ? wordOne.substring(0, Math.floor(wordOne.length/2)) : wordOne
          }${wordTwo.length>3 ? wordTwo.substring(Math.floor(wordTwo.length/2)) : wordTwo}`;
    }
}
decorate(WordStore, {
    wordOne: observable,
    wordTwo: observable,
    hybridWord: computed,

    setWordOne: action,
    setWordTwo: action,
});

export const wordStore = new WordStore();

export const InputWordOne = inject("word")(observer(({word, style}) => {
    console.log("InputWordOne");

    return(
        <input
            type={"text"}
            placeholder={"первое слово"}
            value={word.wordOne}
            onChange={(event) => {
                word.setWordOne(event.target.value);
            }}
            style={style}
        />
    );
}));

const InputWordTwo = inject("word")(observer(({word, style}) => {
    console.log("InputWordTwo");

    return(
        <input
            type={"text"}
            placeholder={"второе слово"}
            value={word.wordTwo}
            onChange={(event) => {
                word.setWordTwo(event.target.value);
            }}
            style={style}
        />
    );
}));

const MixWords = observer(({style}) => {
    console.log("MixWords");

    return(
        <input
            type={"button"}
            value={"авто-смешивание"}
            disabled={true}
            onClick={() => {
                //wordStore.mixWords();
            }}
            style={style}
        />
    );
});

export const HybridWord = inject("word")(observer(({word, style}) => {
    console.log("HybridWord");

    return(
        <input
            type={"input"}
            placeholder={"новое слово"}
            value={word.hybridWord}
            onChange={()=>{}}
            style={style}
        />
    );
}));

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
            <Provider word={wordStore}>
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
            </Provider>
        );
    }
}

export default App;
