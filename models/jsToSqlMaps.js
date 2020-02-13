/* eslint-disable no-prototype-builtins */
/**
 * This function maps db object to js object
 * @param {obj} input object returned from db (snake_case)
 * @param {objMap} input array of property matching pairs
 * @returns {jsObj} oblect mapped to js (camelCase).
 */
const toJS = (obj, objMap) => {
  const jsObj = {};
  objMap.forEach(propSet => {
    if (obj.hasOwnProperty(propSet[1]))
      jsObj[propSet[0]] = obj[propSet[1]];
  });
  return jsObj;
};

/**
 * This function maps js object to db object
 * @param {obj} input ij object (camelCase)
 * @param {objMap} input array of property matching pairs
 * @returns {jsSQL} oblect mapped to sql (snake_case).
 */
const toSQL = (obj, objMap) => {
  const sqlObj = {};
  objMap.forEach(propSet => {
    if (obj.hasOwnProperty(propSet[0]))
      sqlObj[propSet[1]] = obj[propSet[0]];
  });
  return sqlObj;  
};

module.exports = { toJS, toSQL};
