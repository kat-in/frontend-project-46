import yaml from 'js-yaml';

const parsers = (file, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
      return yaml.load(file);
    case '.yaml':
      return yaml.load(file);
    default:
      throw new Error(`Неизвестный формат ${format}`);
  }
};

export default parsers;
