import _ from "lodash";

const stylish = (value, replacer = `..`, spacesCount = 2) => {
  const status = {
    deleted: "  - ",
    added: "  + ",
    unchange: "    ",
    changed: "+-",
  };

  const iter = (node, depth) => {
    if (!_.isObject(node)) {
      return node;
    }

    const indentSize = spacesCount * depth;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const objToString = _.map(node, (objectValue, key) => {
      if (_.isObject(objectValue)) {
        return `${currentIndent}${key}: ${iter(objectValue, depth + 1)}`;
      }
      return `${currentIndent}${key}: ${objectValue}`;
    });
    console.log(node);
    return ["{", ...objToString, `${bracketIndent}}`].join("\n");
  };
  return iter(value, 1);
};

export default stylish;
