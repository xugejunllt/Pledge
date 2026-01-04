const getMethods = (obj) => {
    let properties = new Set()
    let currentObj = obj
    do {
      Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
    } while ((currentObj = Object.getPrototypeOf(currentObj)))
    return [...properties.keys()].filter(item => typeof obj[item] === 'function')
  }
// show({x}), must have {}, and x is a singel variable
const show = (x) => {
    const key = Object.keys(x)[0];
    const val = Object.values(x)[0];
    console.log(`${key}: ${val?.toString() ?? 'undefined'}`);
}
const getVarName = varObj => {
    Object.keys(varObj)[0]
}

module.exports = {
    getMethods,
    show,
    getVarName
};