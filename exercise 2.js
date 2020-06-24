const findValueByPath = (item, path) => {
    return path.split('.').reduce((prev, cur, index, array) => {
        return prev[cur] ? prev[cur] : item;
    },item);
};

const autocompleteObjectNode = (origin) => {
  const proxyWrapper = (object, path) => {
      return new Proxy(object, {
          set: (obj, prop, value) => {
              console.log({
                  method: "set",
                  current: obj,
                  prop,
                  propType: typeof prop,
                  value,
                  origin,
                  path
              });
              const item = findValueByPath(origin, path);
              Object.defineProperty(item, prop, {value: value, writable: true, configurable: true, enumerable: true});
              return proxyWrapper(item, `${path}.${prop}`);
          },
          get: (obj, prop) => {
              console.log({
                  method: "get",
                  current: obj,
                  prop,
                  propType: typeof prop,
                  origin,
                  path
              });
              if (obj[prop] === typeof "object") {
                  //console.log("getting prop is exist and object");
                  return proxyWrapper({...obj[prop]}, `${path}.${prop}`);
              } else {
                  if (!obj[prop]
                      && typeof prop !== "symbol"
                      && prop !== "inspect"
                      && prop !== "toJSON"
                  ) {
                      //console.log("getting prop not exist");
                      const item = findValueByPath(origin, path);
                      Object.defineProperty(item, prop, {value: {}, writable: true, configurable: true, enumerable: true});
                      return proxyWrapper({}, `${path}.${prop}`);
                  } else {
                      //console.log("getting prop is exist and not object");
                      return Reflect.get(obj, prop);
                  }
              }
          }
      });
  };

  return proxyWrapper(origin, "");
};

const obj = {
    "first": "10",
    "second": "20",
    "extra": {
        "subextra": 0
    }
};

const proxiedObj = autocompleteObjectNode(obj);

proxiedObj.third.fourty.fifty = "110";

console.log("result", proxiedObj);

const strigifiedProxiedObj = JSON.stringify(proxiedObj);

console.log("stringify", strigifiedProxiedObj, typeof strigifiedProxiedObj);

const parsedProxiedObj = JSON.parse(strigifiedProxiedObj);

console.log("parse", parsedProxiedObj, typeof parsedProxiedObj);