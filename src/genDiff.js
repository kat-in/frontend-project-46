import _ from "lodash";

const genDiff = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const difference = keys.reduce((acc, key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      acc[key] = genDiff(file1[key], file2[key]);
    } else {
      if (!_.includes(keys2, key)) {
        acc[`  - ${key}`] = file1[key];
      } else if (!_.includes(keys1, key)) {
        acc[`  + ${key}`] = file2[key];
      } else if (file1[key] === file2[key]) {
        acc[`    ${key}`] = file1[key];
      } else {
        acc[`  - ${key}`] = file1[key];
        acc[`  + ${key}`] = file2[key];
      }
    }
    return acc;
  }, {});

  return difference;

  // if (type === "stylish") {
  //   const difference = keys.flatMap((key) => {
  //     const result = [];
  //     if (!_.includes(keys2, key)) {
  //       result.push(`  - ${[key]}: ${file1[key]}`);
  //     } else if (!_.includes(keys1, key)) {
  //       result.push(`  + ${[key]}: ${file2[key]}`);
  //     } else if (file1[key] === file2[key]) {
  //       result.push(`    ${[key]}: ${file1[key]}`);
  //     } else {
  //       result.push(`  - ${[key]}: ${file1[key]}`);
  //       result.push(`  + ${[key]}: ${file2[key]}`);
  //     }
  //     return result;
  //   });
  //   return `{\n${_.join(difference, "\n")}\n}`;
  // }

  if (type === "plain") {
    const difference = keys.flatMap((key) => {
      const result = [];
      if (!_.includes(keys2, key)) {
        result.push(`Property '${[key]}' was removed`);
      } else if (!_.includes(keys1, key)) {
        result.push(
          `Property '${[key]}' was added with value: '${file2[key]}'`
        );
      } else if (file1[key] === file2[key]) {
        result.push(`Property '${[key]}' was not updated.`);
      } else {
        result.push(
          `Property '${[key]}' was updated. From: '${file1[key]}' to '${
            file2[key]
          }'`
        );
      }
      return result;
    });
    return _.join(difference, "\n");
  }
  throw new Error("The selected type is not supported");
};

export default genDiff;
