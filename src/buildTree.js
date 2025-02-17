import _ from "lodash";

const buildTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const difference = keys.reduce((acc, key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      acc[key] = buildTree(obj1[key], obj2[key]);
    } else {
      if (!_.includes(keys2, key)) {
        acc[key] = {
          status: "deleted",
          key: `${key}`,
          value: `${obj1[key]}`,
        };
      } else if (!_.includes(keys1, key)) {
        acc[key] = { status: "added", key: `${key}`, value: `${obj2[key]}` };
      } else if (obj1[key] === obj2[key]) {
        acc[key] = { status: "unchange", key: `${key}`, value: `${obj1[key]}` };
      } else {
        acc[key] = {
          status: "changed",
          key: `${key}`,
          oldValue: `${obj1[key]}`,
          newValue: `${obj2[key]}`,
        };
      }
    }
    return acc;
  }, {});
  return difference;
};

export default buildTree;
