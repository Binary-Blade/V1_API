// utils/removeIdField.js
function removeIdField(obj) {
  const newObj = { ...obj };
  delete newObj.id;
  return newObj;
}

module.exports = removeIdField;
