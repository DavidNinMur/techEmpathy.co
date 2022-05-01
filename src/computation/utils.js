export const cloneObj = (objToClone) => {
  let newObjCloned = JSON.parse(JSON.stringify(objToClone));

  return newObjCloned;
};

export const userHaveDoneASearch = ({ store }) => {
  console.log("store.state.queryOfUser :>> ", store.state.queryOfUser);
  if (store.state.queryOfUser !== "") {
    return true;
  } else {
    return false;
  }
};
