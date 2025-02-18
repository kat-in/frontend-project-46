const stylish = (tree, replacer = '  ', spacesCount = 2) => {
  const type = {
    added: '  + ',
    deleted: '  - ',
    unchanded: '    ',
    nested: '    ',
  };
  const iter = (node, depth) => {
    const indentSize = spacesCount * depth;
    const currentIndent = replacer.repeat(indentSize - spacesCount);

    const objToString = node.map((currentNode) => {
      const {
        key, status, value, children, newValue, oldValue,
      } = currentNode;

      switch (status) {
        case 'added':
          return `${currentIndent}${type.added}${key}: ${value}`;

        case 'deleted':
          return `${currentIndent}${type.deleted}${key}: ${value}`;

        case 'unchange':
          return `${currentIndent}${type.unchanded}${key}: ${value}`;

        case 'change':
          return `${currentIndent}${type.deleted}${key}: ${oldValue}\n${currentIndent}${type.added}${key}: ${newValue}`;

        case 'nested-changed-deleted':
          return `${currentIndent}${type.deleted}${key}: ${iter(
            children,
            depth + 1,
          )}\n${currentIndent}${type.added}${key}: ${newValue}`;

        case 'nested-changed-added':
          return `${currentIndent}${
            type.deleted
          }${key}: ${oldValue}\n${currentIndent}${type.added}${key}: ${iter(
            children,
            depth + 1,
          )}`;

        case 'nested':
          return `${currentIndent}${type.nested}${key}: ${iter(
            children,
            depth + 1,
          )}`;

        case 'nested-deleted':
          return `${currentIndent}${type.deleted}${key}: ${iter(
            children,
            depth + 1,
          )}`;

        case 'nested-added':
          return `${currentIndent}${type.added}${key}: ${iter(
            children,
            depth + 1,
          )}`;

        default:
          break;
      }
      return `${key}: ${value}`;
    });
    return ['{', ...objToString, `${currentIndent}}`].join('\n').trim();
  };
  return iter(tree, 1);
};

export default stylish;
