'use strict';

const getLazy = (obj) => {
    const iterator = typeof obj.next === 'function'
        ? obj
        : obj[Symbol.iterator]()
    ;

    return new Proxy(
        obj,
        {
            get(_, prop) {
                switch (prop) {
                    case 'map': //GENERATOR
                        return predicate => getLazy({
                            index: 0,
                            *[Symbol.iterator]() {
                                let { value, done } = iterator.next();
                                while(!done) {
                                    yield predicate(value, this.index++);
                                    ({ value, done } = iterator.next());
                                }
                            }
                        });
                    /*case 'map': //ITERATOR
                        return predicate => getLazy({
                            [Symbol.iterator]() { return this },
                            index: 0,
                            next() {
                                const { value, done } = iterator.next();
                                if (done) {
                                    return { done }
                                } else {
                                    return { done, value: predicate(value, this.index++) }
                                }
                            }
                        });*/
                    case 'take': //GENERATOR
                        return (count) => getLazy({
                            *[Symbol.iterator]() {
                                while(count--) {
                                    yield iterator.next().value;
                                }
                            }
                        });
                    /*case 'take': //ITERATOR
                        return (count) => getLazy({
                            [Symbol.iterator]() { return this },
                            next() {
                                return count-- ? iterator.next() : { done: true }
                            }
                        });*/
                    case 'filter': //GENERATOR
                        return predicate => getLazy({
                            *[Symbol.iterator]() {
                                let { value, done } = iterator.next();
                                while(!done) {
                                    if (predicate(value, this.index++)) {
                                        yield value;
                                    }
                                    ({ value, done } = iterator.next());
                                }
                            }
                        });
                    /*case 'filter': //ITERATOR
                        return predicate => getLazy({
                            [Symbol.iterator]() { return this },
                            index: 0,
                            next() {
                                const { value, done } = iterator.next();
                                if (done) {
                                    return { done }
                                } else {
                                    if (predicate(value, this.index++)) {
                                        return { done, value: value }
                                    } else {
                                        return this.next();
                                    }
                                }
                            }
                        });*/
                    default:
                        return Reflect.get(...arguments)
                }
            }
        }
    )

};

const list = [1, 2, 3, 4, 5];
const lazyIterator = getLazy(list)
    .map(x => { console.log('map 1'); return x + 10 })
    .map(x => console.log('map 2') || (x + 1) )
    .map((x, i) => {
        if (i === 3) { throw 'Oops!!'} else return x
    })
    .take(3)
    .map(x => {console.log('map 3'); return x ** 2});

console.log(...lazyIterator);


const endlessIterator = {
    value: 0,
    next() {
        return { value: this.value++, done: false }
    }
};
console.log(
    ...(
        getLazy(endlessIterator)
            .map(x => x ** 2)
            .filter((item) => {
                return item%3 === 0;
            })
            .take(10)
    )
);