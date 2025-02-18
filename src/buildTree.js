import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const difference = keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        key,
        status: 'nested',
        children: buildTree(obj1[key], obj2[key]),
      };
    }

    if (!_.includes(keys2, key)) {
      if (_.isObject(obj1[key])) {
        return {
          key,
          status: 'nested-deleted',
          children: buildTree(obj1[key], obj1[key]),
        };
      }
      return { key, status: 'deleted', value: obj1[key] };
    }
    if (!_.includes(keys1, key)) {
      if (_.isObject(obj2[key])) {
        return {
          key,
          status: 'nested-added',
          children: buildTree(obj2[key], obj2[key]),
        };
      }
      return { key, status: 'added', value: obj2[key] };
    }

    if (obj1[key] === obj2[key]) {
      return { key, status: 'unchange', value: obj1[key] };
    }

    if (obj1[key] !== obj2[key]) {
      if (_.isObject(obj1[key])) {
        return {
          key,
          newValue: obj2[key],
          status: 'nested-changed-deleted',
          children: buildTree(obj1[key], obj1[key]),
        };
      } if (_.isObject(obj2[key])) {
        return {
          key,
          oldValue: obj1[key],
          status: 'nested-changed-added',
          children: buildTree(obj2[key], obj2[key]),
        };
      }
      return {
        key,
        status: 'change',
        oldValue: obj1[key],
        newValue: obj2[key],
      };
    }
    return { key };
  });
  return difference;
};

export default buildTree;
