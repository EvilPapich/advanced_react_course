import React from "react";
import {default as Enzyme, shallow, mount} from "enzyme";
import {HybridWord, InputWordOne, wordStore} from "./index";
import Adapter from 'enzyme-adapter-react-16';
import 'mobx-react-lite/batchingForReactDom';

Enzyme.configure({ adapter: new Adapter() });

describe("Test", () => {
    const mock = {
        wordOne: "кетчуп",
        wordTwo: "майонез",
        get hybridWord() { return wordStore.mixWords(this.wordOne, this.wordTwo); },
        setWordOne: jest.fn(),
        setWordTwo: jest.fn(),
    };

    describe("InputWordOne", () => {
        let wrapper, component;

        beforeEach(() => {
            wrapper = mount(
                <InputWordOne
                    word={mock}
                    style={{}}
                />
            );

            component = wrapper.instance();
        });

        test("correct pass prop values", () => {
            expect(
                wrapper.find('input').props().value
            ).toEqual(
                mock.wordOne
            );
        });

        test("onchange called store func", () => {
            wrapper.find("input").simulate("change", {target:{value:"text"}});

            expect(
                mock.setWordOne
            ).toHaveBeenCalledWith(
                "text"
            );
        });
    });

    describe("HybridWord", () => {
        let wrapper, component;

        beforeEach(() => {
            wrapper = mount(
                <HybridWord
                    word={mock}
                    style={{}}
                />
            );

            component = wrapper.instance();
        });

        test("correct mixing words", () => {
            expect(
                wrapper.find('input').props().value
            ).toEqual(
                `${mock.wordOne.length>3 ? mock.wordOne.substring(0, Math.floor(mock.wordOne.length/2)) : mock.wordOne
                    }${mock.wordTwo.length>3 ? mock.wordTwo.substring(Math.floor(mock.wordTwo.length/2)) : mock.wordTwo}`
            );
        });
    });
});