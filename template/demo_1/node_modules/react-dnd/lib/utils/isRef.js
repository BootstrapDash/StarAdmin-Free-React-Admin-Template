export function isRef(obj) {
    return (
    // eslint-disable-next-line no-prototype-builtins
    obj !== null && typeof obj === 'object' && obj.hasOwnProperty('current'));
}
