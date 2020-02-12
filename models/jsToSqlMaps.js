/* eslint-disable no-prototype-builtins */
const toJS = (obj, objMap) => {
  const jsObj = {};
  objMap.forEach(propSet => {
    if (obj.hasOwnProperty(propSet[1]))
      jsObj[propSet[0]] = obj[propSet[1]];
  });
  return jsObj;
};

const toSQL = (obj, objMap) => {
  const sqlObj = {};
  objMap.forEach(propSet => {
    if (obj.hasOwnProperty(propSet[0]))
      sqlObj[propSet[1]] = obj[propSet[0]];
  });
  return sqlObj;  
};

module.exports = { toJS, toSQL};
