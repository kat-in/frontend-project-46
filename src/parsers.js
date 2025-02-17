import yaml from "js-yaml";

const parsers = (file, format) => {
  if (format === ".json") {
    return JSON.parse(file);
  }
  if (format === ".yml" || format === ".yaml") {
    return yaml.load(file);
  }
  throw new Error("Unknown format");
};

export default parsers;
