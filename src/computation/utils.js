export const cloneObj = (objToClone) => {
  let newObjCloned = JSON.parse(JSON.stringify(objToClone));

  return newObjCloned;
};
