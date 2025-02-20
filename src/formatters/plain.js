import _ from 'lodash';

const plain = (tree) => {
  const iter = (node, keyDepth) => {
    const objToText = node.map((currentNode) => {
      const {
        key, status, value, children, newValue, oldValue,
      } = currentNode;

      const addedValue = _.isBoolean(value) || value === null || _.isNumber(value)
        ? `was added with value: ${value}`
        : `was added with value: '${value}'`;

      const updatedOldValue = _.isBoolean(oldValue) || oldValue === null || _.isNumber(oldValue)
        ? `was updated. From ${oldValue}`
        : `was updated. From '${oldValue}'`;

      const updatedNewValue = _.isBoolean(newValue) || newValue === null || _.isNumber(newValue)
        ? `to ${newValue}`
        : `to '${newValue}'`;

      switch (status) {
        case 'added':
          return `Property '${keyDepth}${key}' ${addedValue}`;

        case 'deleted':
          return `Property '${keyDepth}${key}' was removed`;

        case 'unchange':
          return '';

        case 'change':
          return `Property '${keyDepth}${key}' ${updatedOldValue} ${updatedNewValue}`;

        case 'nested':
          return iter(children, `${keyDepth}${key}.`);

        case 'nested-deleted':
          return `Property '${keyDepth}${key}' was removed`;

        case 'nested-added': {
          const currentValue = `Property '${keyDepth}${key}' ${addedValue}`;
          const complexValue = `Property '${keyDepth}${key}' was added with value: [complex value]`;
          return value === undefined ? complexValue : currentValue;
        }

        case 'nested-changed-deleted': {
          const currentOldValue = `Property '${keyDepth}${key}' ${updatedOldValue} ${updatedNewValue}`;
          const complexOldValue = `Property '${keyDepth}${key}' was updated. From [complex value] ${updatedNewValue}`;
          return oldValue === undefined ? complexOldValue : currentOldValue;
        }

        case 'nested-changed-added': {
          const currentNewValue = `Property '${keyDepth}${key}' ${updatedOldValue} ${updatedNewValue}`;
          const complexNewValue = `Property '${keyDepth}${key}' ${updatedOldValue} to [complex value]`;
          return newValue === undefined ? complexNewValue : currentNewValue;
        }

        default:
          throw new Error('Неизвестный статус');
      }
    });
    return _.compact(objToText).join('\n').trim();
  };
  return iter(tree, '');
};

export default plain;
