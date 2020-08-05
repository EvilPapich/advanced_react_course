import React from "react";
import {default as Enzyme, shallow, mount} from "enzyme";
import {InputWordOne} from "./index";
import Adapter from 'enzyme-adapter-react-16';
import 'mobx-react-lite/batchingForReactDom';

Enzyme.configure({ adapter: new Adapter() });

describe("Test", () => {
    const mock = {
        wordOne: "кетчуп",
        wordTwo: "майонез",
        get hybridWord() {
            return `${this.wordOne.length>3 ? this.wordOne.substring(0, Math.floor(this.wordOne.length/2)) : this.wordOne
                }${this.wordTwo.length>3 ? this.wordTwo.substring(Math.floor(this.wordTwo.length/2)) : this.wordTwo}`;
        },
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
            )
        });

        test("onchange called store func", () => {
            wrapper.find("input").simulate("change", {target:{value:"text"}});

            expect(
                mock.setWordOne
            ).toHaveBeenCalledWith(
                "text"
            )
        });
    })
});