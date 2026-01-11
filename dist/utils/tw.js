import { assert } from "./assert";
/** Provides autocompletion for tailwindcss */
function tw(...classes) {
    return classes;
}
tw.map = function (object) {
    return object;
};
tw.prefixed = function (...keys) {
    const [firstKey, ...restKeys] = keys;
    let prefixLength = 0;
    while (prefixLength < firstKey.length) {
        if (restKeys.every(key => key[prefixLength] === firstKey[prefixLength])) {
            prefixLength++;
        }
        else {
            break;
        }
    }
    assert(firstKey[prefixLength - 1] === "-", "Prefix must end with a dash");
    return ((v) => v && firstKey.slice(0, prefixLength) + v);
};
export { tw };
