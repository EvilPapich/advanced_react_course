import React from 'react';
import './App.css';
const {Provider, Consumer: WordContextConsumer} = React.createContext();

class WordContextProvider extends React.Component {
    state = {
        wordOne: "кетчуп",
        wordTwo: "майонез",
        hybridWord: "",
    };

    mixWords = () => {
        const {
            wordOne,
            wordTwo,
        } = this.state;

        this.setState({
            hybridWord:
                `${wordOne.length>3 ? wordOne.substring(0, Math.floor(wordOne.length/2)) : wordOne
                    }${wordTwo.length>3 ? wordTwo.substring(Math.floor(wordTwo.length/2)) : wordTwo}`
        });
    };

    render() {
        return (
            <Provider value={{
                wordOne: this.state.wordOne,
                setWordOne: (value) => this.setState({wordOne: value}),
                wordTwo: this.state.wordTwo,
                setWordTwo: (value) => this.setState({wordTwo: value}),
                mixWords: () => this.mixWords(),
                hybridWord: this.state.hybridWord,
            }}>
                {this.props.children}
            </Provider>
        );
    }
}

class InputWordOne extends React.Component {
    render() {
        return(
            <WordContextConsumer>
                {context => (
                    <input
                        type={"text"}
                        placeholder={"первое слово"}
                        value={context.wordOne}
                        onChange={(event) => {
                            context.setWordOne(event.target.value);
                        }}
                        style={this.props.style}
                    />
                )}
            </WordContextConsumer>
        );
    }
}

class InputWordTwo extends React.Component {
    render() {
        return(
            <WordContextConsumer>
                {context => (
                    <input
                        type={"text"}
                        placeholder={"второе слово"}
                        value={context.wordTwo}
                        onChange={(event) => {
                            context.setWordTwo(event.target.value);
                        }}
                        style={this.props.style}
                    />
                )}
            </WordContextConsumer>
        );
    }
}

class MixWords extends React.Component {
    render() {
        return(
            <WordContextConsumer>
                {context => (
                    <input
                        type={"button"}
                        value={"смешать"}
                        onClick={() => {
                            context.mixWords();
                        }}
                        style={this.props.style}
                    />
                )}
            </WordContextConsumer>
        );
    }
}

class HybridWord extends React.Component {
    render() {
        return(
            <WordContextConsumer>
                {context => (
                    <input
                        type={"input"}
                        placeholder={"новое слово"}
                        value={context.hybridWord}
                        onChange={()=>{}}
                        style={this.props.style}
                    />
                )}
            </WordContextConsumer>
        );
    }
}

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
                <WordContextProvider>
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
                </WordContextProvider>
            </div>
        );
    }
}

export default App;
